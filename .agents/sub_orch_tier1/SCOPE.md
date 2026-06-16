# Scope: Tier 1 Feature Coverage

## Architecture
- 6 features defined in `TEST_INFRA.md`
- Generating Playwright tests in `tests/e2e/`
- Tier 1 requires ≥5 tests per feature (happy path / equivalence class representatives)
- DO NOT RUN `npx playwright test` - only generate files.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Tier 1 Tests Generation | Generate >=5 Playwright test cases for each of the 6 features. | none | PLANNED |

## Interface Contracts
- Playwright tests should be written in `.spec.ts` files inside `tests/e2e/tier1/` or `tests/e2e/`
- Tests should use standard Playwright assertions `expect`
- Tests should avoid relying on the current implementation details, using only black-box / opaque-box user-centric interactions where possible, although some mocking might be assumed or placeholder routes.
