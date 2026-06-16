# Scope: Tier 3 Cross-Feature Interactions Tests

## Architecture
- Playwright `.spec.ts` tests in `tests/e2e/`
- Tests cover combinations of major features as per `TEST_INFRA.md` Tier 3.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Tier 3 Tests | Generate pairwise cross-feature interaction Playwright test files in `tests/e2e/`. At least covering the 6 major features. | none | IN_PROGRESS |

## Interface Contracts
- Tests must use standard Playwright assertions.
- Tests must be syntax-correct and compile.
- Tests should mock or assume standard behaviors since implementation track is incomplete.
- Do not run tests, just generate them.
