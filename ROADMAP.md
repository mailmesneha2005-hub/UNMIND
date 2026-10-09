# UNMIND implementation roadmap

## Status

The requested frontend stages are implemented. The workspace began empty; the existing Vite, React, and TypeScript foundation has been retained and extended rather than replaced.

1. **Repository audit and roadmap — complete.** No pre-existing app source or project configuration was present.
2. **Themes, typography, navigation, responsive base — implemented.** Light and dark themes, system-preference first visit, remembered preference, skip link, active navigation, collapsible mobile menu, and reduced-motion rules are present. The latest visual pass uses an Aptos/Segoe UI system font stack, a warm pastel light palette, a deep sage dark palette, and theme-matched text/image contrast.
3. **Hero, pressure map, pressure cycle — implemented.** The hero photo appears once. Three owner-supplied drawings have their pale backgrounds removed and appear once each in an irregular, staggered pressure/check-in collage. Pressure topics expand accessibly. The five-step loop updates by selection.
4. **Pressure check-in — complete.** All eight choices return a local, non-diagnostic acknowledgement and practical steps. No answer is transmitted or persisted.
5. **Real Talk — complete.** The invented composite quotations were replaced with attributed, linked student accounts from Ulster University and *The Daily Star*. Short excerpts retain the speakers and publication context.
6. **Career & Future — complete.** Six job-pressure topics, arrow/Home/End keyboard navigation, and a category-tagged session-only task planner are present.
7. **Practical solutions — implemented.** Eight softly coloured idea panels reveal an example when opened; a second action leads to the relevant reset, career, or support section.
8. **Reset Room — complete.** Optional breathing start/pause/resume/reset, user-started locally generated tone and volume, clearable in-session reflection, and a separate small-task input are implemented.
9. **Indian support and closing — complete.** Tele-MANAS, emergency response 112, tap-to-call links, availability, official source links, and the general-information boundary are shown.
10. **Verification — latest build and focused browser check performed.** After this visual refresh, `npm run build` passed, including TypeScript. Browser inspection found and corrected a dark-mode contrast issue in the pressure-cycle section; image mats now keep line drawings visible against dark surfaces. Earlier checks covered the other interactions and viewport widths; those checks predate this latest layout change and should be repeated before claiming full responsive verification. No lint script or automated test suite is configured.
11. **Authentication pages and demo access — implemented and checked.** `/login`, `/signup`, and `/demo-login` preserve the existing single-page home experience. The demo credentials validate entirely in the browser and set a temporary session flag; guest access skips credentials. Sign-in offers a preferred name and displays a large “How are you, [name]?” welcome; demo access defaults to the editable name “Student.” The name exists only for the current tab session and is cleared on sign-out. A visible demo label and sign-out control appear after entry. Forms provide field validation, accessible password visibility controls, loading feedback, and clear errors. Because there is no backend, account creation and recovery are explicitly not connected, and sign-up details are not stored. Auth pages share the saved theme, use the existing student illustration, and stack on mobile. Browser checks covered each route, required and password-match errors, local sign-up completion messaging, password visibility, incorrect sign-in, recovery messaging, named demo entry/welcome/sign-out, guest entry, and the theme toggle. A 320px viewport check found no overflowing elements on sign-up. `npm run build` passed with type checking; no lint script or automated test suite is configured.

## Project structure

- `src/App.tsx` — page composition, data, and interactive components.
- `src/AuthPages.tsx` — sign-in, sign-up, demo login, and guest-entry experiences.
- `src/styles.css` — theme tokens, editorial layout, responsive styling, and reduced-motion rules.
- `src/main.tsx` — React entry point.
- `src/vite-env.d.ts` — Vite/CSS module types for TypeScript.
- `public/images/academic-overwhelm.jpg` — user-supplied photo used once in the hero.
- `public/images/mind-cloud.png` — user illustration with its pale backdrop removed, used at the check-in.
- `public/images/exam-storm.png` — user illustration with its white backdrop removed, used in the pressure collage.
- `public/images/classroom-pressure.png` — user illustration with its paper backdrop removed, used in the pressure collage.
- `index.html` — document metadata and pre-paint theme preference.
- `package.json` and `package-lock.json` — scripts and locked dependency tree.
- `README.md` — install, run, privacy, and verification notes.
