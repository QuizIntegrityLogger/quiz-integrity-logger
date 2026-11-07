# How to Update your branch with the latest Main

This guide is about how we keep our own branches up to date with `main`. Whenever someone's work gets merged into `main`, your branch doesn't get those changes automatically. If you never update it, your branch slowly drifts away from `main` and you end up with git conflicts later. So we do this routine regularly, and always before starting a new task.

Here is the whole routine. Swap the branch name to git checkout jeds into own your own branch christine or kristine.

```
git add .
git commit -m "Describe what you changed"
git checkout main
git pull
git checkout jeds
git rebase main
```