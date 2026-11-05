[Installation Guide](installation.md)

# Quiz Integrity Logger

A quiz platform that records student activity during an attempt and gives teachers an explainable **integrity concern indicator** for review. Every scoring rule produces a reason, and the teacher makes the final decision.

## Stack

| Layer          | Technology                                                             |
| -------------- | ---------------------------------------------------------------------- |
| Server         | Node.js 24, Express                                                    |
| Database       | SQLite with `better-sqlite3`                                           |
| Client         | React, Vite, React Router                                              |
| Authentication | JWT through the `Authorization` header, password hashing with bcryptjs |
| Testing        | Node.js test runner                                                    |
| Hosting        | Vercel for the client, Render for the server                           |

## Features

- Authentication with student and teacher roles.
- Quiz creation with multiple choice and short answer questions.
- Student consent before behavior logging begins.
- Timed attempts with answer autosave and recovery of saved work after refresh.
- Event logging for question visits, answer changes, focus changes, paste and copy lengths, and typing burst counts.
- Automatic MCQ grading, separate from integrity scoring. Short answer responses are included in the teacher review.
- Teacher review with concern levels, readable flags, question timing, an event timeline, and evidence confidence.
- A separate teacher decision of Cleared or Needs follow up.

## Project structure

| Path                  | Responsibility                                                           |
| --------------------- | ------------------------------------------------------------------------ |
| `server/`             | Express API, configuration, database, authentication, and business logic |
| `server/src/scoring/` | Feature extraction, scoring rules, and concern levels                    |
| `server/src/tests/`   | Scoring and evidence validation checks                                   |
| `client/`             | React application, student workflow, and teacher interface               |

The server separates routing, controllers, data access, and scoring. The client separates API requests, shared components, and pages for each role.

## Local setup

Use Node.js 24 and npm. Open terminals at the repository root. The commands below use PowerShell.

### Server

In the first terminal:

```powershell
cd server
npm install
Copy-Item .env.example .env
```

Set the following values in `server/.env` before starting the server:

| Variable        | Local value                           |
| --------------- | ------------------------------------- |
| `PORT`          | `4000`                                |
| `JWT_SECRET`    | A long random secret kept outside Git |
| `DB_PATH`       | `./data/app.db`                       |
| `CLIENT_ORIGIN` | `http://localhost:5173`               |

Then initialize the database and start development:

```powershell
npm run migrate
npm run dev
```

To create optional demo users and a sample quiz, run `npm run seed` after migration. The seed script preserves existing records.

### Client

In a second terminal, starting from the repository root:

```powershell
cd client
npm install
Copy-Item .env.example .env
```

Set `VITE_API_URL` in `client/.env` to `http://localhost:4000/api`, then run:

```powershell
npm run dev
```

Open the client at `http://localhost:5173`. The server health endpoint is `http://localhost:4000/health`.

Keep real environment files, database files, SQLite companion files, and `node_modules` out of Git. Commit the generated `package-lock.json` files.

## Tests and build

Run the server checks from `server`:

```powershell
npm test
```

Create the production client build from `client`:

```powershell
npm run build
```

The client build is written to `client/dist`.

## Integrity scoring

The rules inspect short answer paste events, repeated focus loss, unusually fast answers, uniform answer timing, and verified MCQ corrections after focus returns.

The concern score ranges from **0 to 100**. Higher values mean more rule triggered concern.

| Score     | Concern level |
| --------- | ------------- |
| 0 to 29   | Low           |
| 30 to 59  | Medium        |
| 60 to 100 | High          |

The score reflects heuristic rule contributions and does not express a probability of misconduct. A short quiz produces a confidence notice without adding concern points. Missing timing or event data also reduces evidence confidence.

The integrity score is separate from academic MCQ points. A teacher decision does not change either score.

## Principles and limitations

- The score is an indicator, not proof. A teacher reviews the evidence and decides whether follow up is needed.
- Capture begins only after explicit consent and is limited to activity observed within the quiz application.
- No camera, microphone, screen recording, browsing destinations, raw key characters, or clipboard text are recorded. Quiz answers are stored separately as submitted work.
- Every scoring contribution maps to a readable rule explanation with the observed numbers.
- The server enforces deadlines, attempt ownership, grading, and access to answer keys.
- Fast answers and focus changes can have ordinary explanations, including familiarity with the material or accessibility tools.
- Browser events can be blocked, lost, or manipulated. Missing events do not prove misconduct, and activity on another device cannot be observed by this application.

## Deployment

| Setting                 | Vercel                   | Render                                               |
| ----------------------- | ------------------------ | ---------------------------------------------------- |
| Project root            | `client`                 | `server`                                             |
| Build command           | `npm run build`          | `npm ci`                                             |
| Output or start         | Output directory: `dist` | Start command: `npm start`                           |
| Main environment values | `VITE_API_URL`           | `JWT_SECRET`, `CLIENT_ORIGIN`, `DB_PATH`, `NODE_ENV` |

Set `VITE_API_URL` to the Render URL ending in `/api`. Set server `CLIENT_ORIGIN` to the exact Vercel origin. Keep the SPA rewrite in `client/vercel.json` so direct page links and refreshes work.

SQLite needs a paid Render service with a persistent disk for durable storage. Mount the disk at `/var/data`, set `DB_PATH=/var/data/app.db`, and use one service instance. Run migrations at startup, when the disk is available.

A Render service without a persistent disk loses local database changes when its filesystem resets. Demo seeding can recreate starting data but cannot preserve submissions.

Use authenticated `fetch` requests with `keepalive` for a small final event flush. Periodic flushing is still required because delivery during page closure is not guaranteed.

See [Render persistent disks](https://render.com/docs/disks) and [Vite SPA routing on Vercel](https://vercel.com/docs/frameworks/frontend/vite) for deployment details.
