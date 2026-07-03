# Code Review Rules

## TypeScript
- Use const/let, never var
- No `any` types; prefer explicit types or generics
- Use type imports (`import type`) for type-only imports
- Path alias `@/*` maps to `./src/*` — prefer it over relative deep imports

## React
- Use functional components with hooks
- Prefer named exports for components
- Server components by default; add `'use client'` only when needed
- Use `Link` and `useRouter` from `@/i18n/navigation`, not from Next.js directly

## Internationalization
- All user-facing strings come from `src/messages/es.json` and `en.json`
- Keep both locale files in sync when adding keys
- Server components: `getMessages()` + `setRequestLocale(locale)`
- Client components: `useTranslations('namespace')`

## Styling
- Tailwind CSS utility classes; merge with `cn()` from `@/lib/utils`
- Theme via CSS variables in `globals.css` (`:root` and `.dark`)

## Testing
- Jest + React Testing Library for units, Playwright for E2E
- Test behavior, not implementation details
- New logic in `src/lib/` requires unit tests

## Commits
- Conventional Commits (feat, fix, chore, test, docs, refactor)
- No AI attribution or co-author trailers
