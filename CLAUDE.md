# Project Rules

## Git & GitHub
- Always use the `gh` CLI for any interaction with GitHub (PRs, issues, releases, etc.).
- This project uses **only the `main` branch**. Never create separate branches. Everything must be committed and pushed to `main`.

## Before pushing
- Always run a production build **before** pushing, to verify the Vercel build will succeed.
- If the build fails, fix the errors and re-run the build until it passes. Only push once the build is green.

## Syncing with remote
- **At the start of every new session**, check the git remote for updates and pull any changes before doing work, to avoid merge conflicts.
- **Before pushing**, check the remote again. If there are new changes, pull and merge them, resolve any conflicts, then push.
