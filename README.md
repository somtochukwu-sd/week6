# YRA — Week 6 Assignment (Angular)

Angular project named **Yra**, built from the teacher's `preview.html` design.

## Where each requirement lives

| Requirement | Location |
| --- | --- |
| Project called Yra, all pages wired up | `src/app/app.routes.ts` + `src/app/pages/*` |
| "Hello, [Component Name]" on every page via a **writable signal** | `name = signal(...)` in every page component (e.g. `src/app/pages/home/home.ts`) |
| Navbar colour select (blue, yellow, red, black) | `src/app/components/navbar/navbar.html` + `navbar.ts` |
| Colour broadcast with a **Subject** | `ThemeService.colorSubject$` — `src/app/services/theme.service.ts` |
| Same functionality with a **BehaviorSubject** | `ThemeService.colorBehaviorSubject$` — switch the "demo stream" select in the navbar to compare: a Subject has no memory (late pages stay uncoloured), a BehaviorSubject replays the last colour |
| `[ngStyle]` / `[ngClass]` applying the colour | `.hello-banner` in every page template, stream badge in the navbar |
| Login page with **Signal Forms** + validation schema per field | `src/app/pages/login/login.ts` (`form()` + `required`, `email`, `minLength`) |
| `LoginService` login via **Promise** (resolve/reject, logs credentials) | `loginWithPromise()` — `src/app/services/login.service.ts` |
| Same login via **Observable**, `pipe()` uppercases credentials before logging | `loginWithObservable()` — `src/app/services/login.service.ts` |

## Run it

```bash
npm install
npm start
```

Open http://localhost:4200. Node.js >= 20.19 (or 22.12) required.
