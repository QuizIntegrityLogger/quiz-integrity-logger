This guide covers how to get Quiz Integrity Logger running on your computer. The commands are written for Windows PowerShell, so you may need to adjust a few if you're on a different shell. Follow the steps in order.

The project uses Node.js 24 with npm. Confirm your versions before starting:

```powershell
node -v
npm -v
```

## 1. Get the project

Open a terminal in the folder where you keep your projects. If you don't have the project yet, clone it from a parent folder that doesn't already contain it:

```powershell
git clone https://github.com/QuizIntegrityLogger/quiz-integrity-logger.git
cd quiz-integrity-logger
```

If you've already cloned the repository, open that existing folder instead. Either way, open the folder that contains `server`, `client`, and `README.md` in VS Code, then open a terminal there. All commands below run from this project root unless they say otherwise.

## 2. Switch to your branch

A fresh clone starts on `main`, so switch to your own branch before you install anything. The branches `kristine` and `christine` already exist on GitHub, so you don't create them yourself. Fetch them and switch to yours:

```powershell
git fetch
git checkout kristine
```

Use `christine` instead if that is your branch. Git sets up the tracking for you, so a plain `git push` and `git pull` work from then on. Confirm you are on the right branch:

```powershell
git branch
```

The branch you are on is marked with an asterisk. Your branch may be behind `main`, so bring it up to date:

```powershell
git pull origin main
```

Do this step every time before you start working, so the code and package files you install match the latest `main`.

## 3. Install the packages

The `package.json` and `package-lock.json` files for both `server` and `client` are already committed, so there is no package setup to do. Just install the exact versions recorded in the lockfiles:

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

## 4. Create the environment files

The repository does not include `.env` files, so you need to create them yourself. You need one inside `server` and one inside `client`.

In VS Code, right click the `server` folder, choose New File, and name it exactly `.env`. Do the same inside the `client` folder. Make sure the name has no `.txt` at the end. You can also create both from the project root in PowerShell:

```powershell
New-Item server/.env -ItemType File
New-Item client/.env -ItemType File
```

Open `server/.env` and paste this:

```dotenv
PORT=4000
JWT_SECRET=replace_with_a_long_random_secret
DB_PATH=./data/app.db
CLIENT_ORIGIN=http://localhost:5173
```

Replace the JWT placeholder with your own secret. To generate one, run this in any terminal, since Node is already installed:

```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

It prints a 128 character random string. Copy it and paste it after `JWT_SECRET=` in `server/.env`, with no quotes and no spaces. Each person should generate their own secret, and it should never be committed or shared in chat. If you change the secret later, restart the server and log in again, because tokens signed with the old secret stop working.

Now open `client/.env` and paste this:

```dotenv
VITE_API_URL=http://localhost:4000/api
```

Save both files. Real `.env` files are ignored by Git, so your secret stays on your machine. Never commit them.

## 5. Run the application

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

## 6. Run checks and build the client

In the server terminal, stop the dev server with `Ctrl+C`, then run:

```powershell
npm test
```

In the client terminal, stop the dev server with `Ctrl+C`, then run:

```powershell
npm run build
```

The build is written to `client/dist`.

## 7. Committing your changes

Commit and push to your own branch, not to `main`:

```powershell
git add .
git commit -m "Describe what you changed"
git push
```

The root `.gitignore` already excludes `node_modules`, real `.env` files, build output, SQLite database files (including their WAL and SHM companions), and log files. Before committing, run `git status` and confirm that none of the ignored items appear.

When you add or update a dependency, commit both `package.json` and `package-lock.json` so everyone installs the same versions.

The timing chart works with plain React elements. Install `recharts` in `client` only if the teacher interface ends up using it.
