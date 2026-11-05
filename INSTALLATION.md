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

If you've already cloned the repository, use that existing folder.

## 2. Set up the server packages

You only need to do this once. The original `package.json` files are comment guides, and this step converts them into real package configurations. If `server/package.json` is already valid and the dependencies are installed, skip to section 3.

From the project root:

```powershell
cd server
Rename-Item package.json package-guide.txt
npm init -y
npm pkg set type=module "engines.node=24.x"
npm pkg set "scripts.dev=nodemon src/index.js" "scripts.start=node src/index.js"
npm pkg set "scripts.migrate=node src/db/migrate.js" "scripts.seed=node src/db/seed.js" "scripts.test=node --test"
npm install express cors dotenv better-sqlite3 bcryptjs jsonwebtoken zod helmet morgan
npm install --save-dev nodemon
```

The original instructions are preserved in `server/package-guide.txt`. The new `server/package.json` must be valid JSON with no comments.

If npm reports an unapproved install script for `better-sqlite3`, review it and approve the package:

```powershell
npm install-scripts ls
npm install-scripts approve better-sqlite3
```

Then check for vulnerabilities:

```powershell
npm audit
```

Review the report before deciding what to update. Avoid `npm audit fix --force`, since it can introduce breaking changes.

## 3. Set up the client packages

Open a second terminal at the project root. As with the server, do this once, and only if the client's package file still contains the original guide comments.

```powershell
cd client
Rename-Item package.json package-guide.txt
npm init -y
npm pkg set type=module "engines.node=24.x"
npm pkg set "scripts.dev=vite" "scripts.build=vite build" "scripts.preview=vite preview"
npm install react react-dom react-router-dom
npm install --save-dev vite @vitejs/plugin-react
```

The timing chart works with plain React elements. Install `recharts` only if the teacher interface ends up using it.

## 4. Track the package files

Before committing, set up Git ignore rules for both folders. Make sure the following are excluded:

- `node_modules`
- Real `.env` files
- `client/dist`
- SQLite database files, including their WAL and SHM companions

Keep `.env.example` tracked.

Commit both `package.json` files and both `package-lock.json` files so everyone installs the same dependency versions.

## 5. Install on another computer

If you've cloned a repository that already has valid package files and committed lockfiles, skip sections 2 and 3 and run the following from the project root:

```powershell
cd server
npm ci
cd ../client
npm ci
cd ..
```

## 6. Configure the environment

Complete the `.env.example` templates first, then copy them. From the project root:

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

## 7. Run the application

Installing dependencies doesn't produce a working app on its own. These commands require the source files and configuration to be in place. Before starting the client, make sure `vite.config.js`, `index.html`, and the application modules are implemented. Before deploying, replace the comments in `vercel.json` with valid JSON.

In the first terminal, from the project root:

```powershell
cd server
npm run migrate
npm run dev
```

To add optional demo users and a sample quiz, run `npm run seed` after the migration and before starting the server.

In the second terminal, from the project root:

```powershell
cd client
npm run dev
```

Open `http://localhost:5173` in your browser. You can confirm the server is running at `http://localhost:4000/health`.

## 8. Run checks and build the client

In the server terminal, stop the dev server with `Ctrl+C`, then run:

```powershell
npm test
```

In the client terminal, stop the dev server with `Ctrl+C`, then run:

```powershell
npm run build
```

The build is written to `client/dist`.
