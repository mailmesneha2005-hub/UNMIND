# UNMIND

A responsive, visual student wellbeing site about the pressures of study, family expectations, comparison, exhaustion, and career uncertainty. Warm, calming colour runs through both themes, with accessible contrast in light and dark mode.

## Run locally

1. Install Node.js 20.19+ or 22.12+ (the current Vite toolchain requirement).
2. Run `npm ci` to install the locked dependencies.
3. Run `npm run dev` and open the local URL printed by Vite.
4. Run `npm run typecheck` for the strict TypeScript check.
5. Run `npm run build` to type-check and create the production site in `dist/`.

## Authentication demo

- `/login`, `/signup`, and `/demo-login` are integrated routes. The existing one-page UNMIND experience remains the destination after entry.
- On the login and demo pages, use `demo@unmind.app` with password `UnmindDemo123!`, or choose **Explore as guest**.
- Demo and guest status use a session-only flag. The demo header identifies the session and offers **Sign out**. No password or account data is stored.
- Sign-in offers a preferred name and greets visitors with a larger “How are you, [name]?” message after entry. Demo access starts with the editable display name “Student”; visitors can change it before entering. The name is held only for the current tab session and cleared on sign-out.
- There is no authentication backend: real sign-in, account creation, and password recovery are not connected. The sign-up form only validates locally and does not send or save the entered details.
- Authentication pages share the site's saved light/dark theme and student illustration, with a stacked small-screen layout.

There is currently no lint script or automated test suite in this project.

## Privacy and media

- The theme preference is stored in local storage. First visit follows the operating-system theme preference.
- Check-in choices, planner tasks, and brain-dump text stay in page memory and are not sent or saved after leaving the page.
- Ambient sound is generated in the browser only after the visitor presses Play. It does not autoplay.
- The owner supplied three hand-drawn student-pressure illustrations. Their pale page backgrounds were removed and each illustration appears once in an irregular, staggered composition. The hero photograph is also only used once. No external image host is required.
- Illustration mats and text colours adapt to the chosen light or dark theme. The dark theme gives black-ink artwork a light paper-like backing so it stays visible.
- Indian support contacts link to the Government of India student-support directory and Emergency Response Support System website.
