# Node.js installation and project setup

Commands for Quiz Integrity Logger on Windows PowerShell. Run each command in the order shown.

Use Node.js 24 with npm. Check your installation:

```powershell
node -v
npm -v
```

## 1. Open the project root

Open the folder containing `server`, `client`, and `README.md` in VS Code, then open its terminal.

If you need a fresh clone, run these commands from a parent folder where the project does not already exist:

```powershell
git clone https://github.com/QuizIntegrityLogger/quiz-integrity-logger.git
cd quiz-integrity-logger
```

If the repository is already cloned, use that existing folder.

## 2. Initialize the server packages

This section is for converting the original comment guides into real package configuration. Perform it once. If `server/package.json` is already valid and its dependencies are installed, continue to section 3.

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

The original instructions remain in `server/package-guide.txt`. The new `server/package.json` must contain valid JSON without comments.

If npm reports an unapproved install script for `better-sqlite3`, review it and approve that package:

```powershell
npm install-scripts ls
npm install-scripts approve better-sqlite3
```

Inspect any reported vulnerabilities:

```powershell
npm audit
```

Review the report before choosing a dependency update. `npm audit fix --force` can introduce breaking changes.

## 3. Initialize the client packages

Open a second terminal at the project root. Perform this section once if the client package file still contains the original guide comments.

```powershell
cd client
Rename-Item package.json package-guide.txt
npm init -y
npm pkg set type=module "engines.node=24.x"
npm pkg set "scripts.dev=vite" "scripts.build=vite build" "scripts.preview=vite preview"
npm install react react-dom react-router-dom
npm install --save-dev vite @vitejs/plugin-react
```

The timing chart can use ordinary React elements. Install `recharts` only if the teacher interface uses that library.

## 4. Track the package files

Before committing, configure actual Git ignore rules for both folders. Exclude `node_modules`, real `.env` files, `client/dist`, and SQLite database files including their WAL and SHM companions. Keep `.env.example` tracked.

Commit both `package.json` files and both generated `package-lock.json` files. These let teammates install the same dependency versions.

## 5. Install dependencies on another computer

After cloning a repository with valid package files and committed lockfiles, use these commands from the project root. Skip the initialization and rename commands in sections 2 and 3.

```powershell
cd server
npm ci
cd ../client
npm ci
cd ..
```

## 6. Configure the environment

Complete the actual `.env.example` templates before copying them. From the project root:

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

These commands require implemented source files and configuration. Installing dependencies alone does not turn the comment guides into an application. Implement `vite.config.js`, `index.html`, and the application modules before starting the client. Replace the comments in `vercel.json` with valid JSON before deployment.

In the first terminal, starting at the project root:

```powershell
cd server
npm run migrate
npm run dev
```

To add optional demo users and a sample quiz, run `npm run seed` after migration and before starting the server.

In the second terminal, starting at the project root:

```powershell
cd client
npm run dev
```

Open `http://localhost:5173`. The server health endpoint is `http://localhost:4000/health`.

## 8. Run checks and create a client build

In the server terminal, stop development with `Ctrl+C`, then run:

```powershell
npm test
```

In the client terminal, stop development with `Ctrl+C`, then run:

```powershell
npm run build
```

The client build is written to `client/dist`.
