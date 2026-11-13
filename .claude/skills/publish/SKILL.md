---
name: publish
description: "Ship a change to the live portfolio: verify, branch, PR from development to main, and confirm the Pages deploy. Use it before any commit, push or pull request in this repo."
---

# Publishing a change

`main` is production: every push to it triggers the GitHub Pages deploy. Work happens on
`development` and reaches `main` through a pull request. Never push directly to `main`.

## Branches

| Branch | Role |
|---|---|
| `development` | Integration. Everything lands here first. |
| `main` | Production. Deploys to https://ibaidoronoz.github.io |
| `feature/<slug>` | Optional, for a change that needs isolation. |

## Steps

1. **Verify** before anything else:

   ```powershell
   npm run verify
   ```

   `astro check` must report zero errors and the build must produce `dist/`. A Zod error in
   `projects.yaml` fails here, which is the point.

2. **Check what changed**:

   ```powershell
   git status --short
   git diff
   ```

   Review every file. Confirm there is no `.map`, no secret, no real data and no LAN host in
   the diff, and that nothing under `dist/` is staged.

3. **Commit only when the user asks.** One logical change per commit, conventional style
   (`feat:`, `fix:`, `chore:`, `docs:`), imperative subject in English, no emoji.

4. **Open the pull request** from `development` into `main`. The title mirrors the commit;
   the body lists what changed, why, and how it was verified. Wait for the CI workflow to
   pass.

5. **Merge, then confirm the deploy** in the Actions tab. If the deploy fails, the previous
   site stays live; fix forward on `development` and open a new PR instead of force-pushing.

## Traps

- The deploy workflow only runs on `main`. A green PR does not mean a green deploy: both run
  `npm ci && npm run build`, but Pages upload and source-map checks run only there.
- `dist/` is committed in some checkouts. It must never be. Confirm `.gitignore` covers it.
- Everything in `dist/` is public and indexed. Treat a build artifact as a press release.
- Do not amend or force-push a branch a PR is tracking.

## Both languages and the CV

- `npm run verify` builds `/` and `/es/`. `assertCaseStudies('es')` throws on a missing
  Spanish entry or study, so a green build means both locales are complete.
- After touching `src/data/cv.ts`, regenerate the two PDFs from the built site:

  ```powershell
  npm run build; npm run preview
  & "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu `
    --no-pdf-header-footer --print-to-pdf="$PWD\public\cv\ibai-diez-oronoz-cv-en.pdf" "http://localhost:4321/cv"
  & "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu `
    --no-pdf-header-footer --print-to-pdf="$PWD\public\cv\ibai-diez-oronoz-cv-es.pdf" "http://localhost:4321/es/cv"
  npm run build
  ```
- Check both themes before a release: the toggle writes `data-theme` and `auto` follows the
  system. Anything invisible in one theme is a hardcoded colour, not a missing token.