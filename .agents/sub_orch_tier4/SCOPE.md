# Scope: Tier 4 - Real-World Application Scenarios

## Architecture
- Module/package boundaries: Playwright test files in `tests/e2e/tier4/`
- Data flow: Opaque-box E2E testing using Playwright
- We will mock the backend or simply write tests targeting expected UI elements if backend is absent. The requirements are opaque-box.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Generate Tier 4 Tests | Write Playwright tests for 5 realistic scenarios in `tests/e2e/tier4/` | none | PLANNED |

## Interface Contracts
### Playwright ↔ Next.js
- Playwright will test against the local or deployed Next.js instance via `http://localhost:3000` or equivalent base URL.
- No direct database queries; all validations via UI.
