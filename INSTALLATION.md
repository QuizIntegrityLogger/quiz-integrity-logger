This guide covers how to get Quiz Integrity Logger running on your machine. The commands are written for Windows PowerShell, so you may need to adjust a few if you're on a different shell. Follow the steps in order.

The project uses Node.js 24 with npm. Confirm your versions before starting:

```powershell
node -v
npm -v
```

## 1. Open the project root

Open the folder that contains `server`, `client`, and `README.md` in VS Code, then open a terminal there.

If you don't have the project yet, clone it from a parent folder that doesn't already contain it:

```powershell
git clone https://github.com/QuizIntegrityLogger/quiz-integrity-logger.git
cd quiz-integrity-logger
```

If you've already cloned the repository, use that existing folder and pull the latest changes:

```powershell
git pull
```

## 2. Install the packages

The `package.json` and `package-lock.json` files for both `server` and `client` are already committed, so there is no package setup to do. Just install the exact versions recorded in the lockfiles. From the project root:

```powershell
cd server
npm ci
cd ../client
npm ci
cd ..
```

Do not run `npm init`, `npm pkg set`, or `npm install <package>` for the initial setup. Those would change the committed package files. Use `npm install <package>` only when you are intentionally adding a new dependency, and commit the updated `package.json` and `package-lock.json` together.

If npm reports an unapproved install script for `better-sqlite3`, review it and approve the package:

```powershell
cd server
npm install-scripts ls
npm install-scripts approve better-sqlite3
cd ..
```

To check for vulnerabilities, run `npm audit` inside `server` or `client`. Review the report before deciding what to update, and avoid `npm audit fix --force`, since it can introduce breaking changes.

## 3. Configure the environment

Copy the example files to real `.env` files. From the project root:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
```

In `server/.env`, set:

```dotenv
PORT=4000
JWT_SECRET=replace_with_a_long_random_secret
DB_PATH=./data/app.db
CLIENT_ORIGIN=http://localhost:5173
```

Replace the JWT placeholder with your own secret. In `client/.env`, set:

```dotenv
VITE_API_URL=http://localhost:4000/api
```

Real `.env` files are ignored by Git, so your secret stays on your machine. Never commit them.

## 4. Run the application

Installing dependencies doesn't produce a working app on its own. These commands require the source files and configuration to be in place. Before starting the client, make sure `vite.config.js`, `index.html`, and the application modules are implemented. Before deploying, replace the comments in `vercel.json` with valid JSON.

In the first terminal, from the project root:

```powershell
cd server
npm run migrate
npm run dev
```

To add optional demo users and a sample quiz, run `npm run seed` after the migration and before starting the server.

Open a second terminal at the project root and run:

```powershell
cd client
npm run dev
```

Open `http://localhost:5173` in your browser. You can confirm the server is running at `http://localhost:4000/health`.

## 5. Run checks and build the client

In the server terminal, stop the dev server with `Ctrl+C`, then run:

```powershell
npm test
```

In the client terminal, stop the dev server with `Ctrl+C`, then run:

```powershell
npm run build
```

The build is written to `client/dist`.

## 6. Committing your changes

The root `.gitignore` already excludes `node_modules`, real `.env` files, build output, SQLite database files (including their WAL and SHM companions), and log files. `.env.example` stays tracked. Before committing, run `git status` and confirm that none of the ignored items appear.

When you add or update a dependency, commit both `package.json` and `package-lock.json` so everyone installs the same versions.

The timing chart works with plain React elements. Install `recharts` in `client` only if the teacher interface ends up using it.
