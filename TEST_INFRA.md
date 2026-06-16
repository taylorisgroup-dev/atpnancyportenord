# E2E Test Infra: ATP Nancy Next.js

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Public Pages Rendering | ORIGINAL_REQUEST R1 | 5      | 5      | ✓      |
| 2 | Dynamic Data Loading | ORIGINAL_REQUEST R3 | 5      | 5      | ✓      |
| 3 | Admin Auth | ORIGINAL_REQUEST R4 | 5      | 5      | ✓      |
| 4 | Admin Data Mutation | ORIGINAL_REQUEST R4 | 5      | 5      | ✓      |
| 5 | CV Extraction API | Explorer Analysis | 5      | 5      | ✓      |
| 6 | SEO Metadata | ORIGINAL_REQUEST R3 | 5      | 5      | ✓      |

## Test Architecture
- Test runner: Playwright (Standard for Next.js)
- Test case format: `.spec.ts` files in `tests/e2e/`
- Command: `npx playwright test`

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Visitor reads home and applies to job | 1, 2, 5 | Medium |
| 2 | Admin logs in and updates organigramme | 3, 4 | High |
| 3 | SEO bot crawls the public pages | 1, 2, 6 | Low |

## Coverage Thresholds
- Tier 1: ≥5 per feature
- Tier 2: ≥5 per feature (where boundaries exist)
- Tier 3: pairwise coverage of major feature interactions
- Tier 4: ≥5 realistic application scenarios
