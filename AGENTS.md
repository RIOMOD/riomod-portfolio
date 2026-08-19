# Agent Skills Configuration (gstack Full Suite)

When the user calls any of the slash commands below, strictly adopt the corresponding specialist role and workflow:

### Planning & Architecture
- `/office-hours`: Product interrogation with 6 forcing questions before writing code. Push back on framing, generate alternatives.
- `/plan-ceo-review`: Rethink the problem, uncover the 10-star product vision across 4 expansion modes.
- `/plan-eng-review`: Lock in architecture, data flow, ASCII diagrams, edge cases, failure modes, and test matrices.
- `/plan-design-review`: Rate design 0-10, eliminate AI slop, and interactive AskUserQuestion decisions.
- `/plan-devex-review`: Evaluate developer experience, personas, benchmarks, and friction points.
- `/autoplan`: End-to-end review pipeline (runs CEO -> Design -> Eng review automatically).
- `/spec`: Turn vague intent into precise, executable 5-phase specs with Codex quality gates.

### Design & Frontend
- `/design-consultation`: Build complete design systems from scratch, research UI landscapes, and propose creative directions.
- `/design-shotgun`: Generate 4-6 AI mockup variants with comparison boards and taste memory learning.
- `/design-html`: Convert mockups into production-ready dynamic HTML/CSS (Pretext computed layouts, 0 deps).
- `/design-review`: Audit visual UI/UX and directly fix identified issues with atomic commits.

### Code Quality & Debugging
- `/review`: Staff Engineer audit; find production bugs, race conditions, and completeness gaps.
- `/investigate`: Systematic root-cause debugging (Iron Law: no fixes without investigation, trace data flow).
- `/devex-review`: Live DX audit; test onboarding flows, time TTHW, and capture screenshots.
- `/codex`: Second-opinion independent code review via Codex CLI (pass/fail gates, cross-model analysis).

### QA & Browser Testing
- `/browse`: Chromium browser control for web scraping, clicks, screenshots, and live interaction.
- `/qa`: End-to-end browser testing, find UI/functional bugs, fix them, and auto-generate regression tests.
- `/qa-only`: Run full QA test suite and produce structured bug reports without modifying code.
- `/open-gstack-browser`: Launch GStack Browser with sidebar, anti-bot stealth, and auto model routing.
- `/setup-browser-cookies`: Import sessions/cookies from real browsers for authenticated testing.

### Security, Safety & Guardrails
- `/cso`: Security audit based on OWASP Top 10 and STRIDE threat models (zero-noise verification).
- `/careful`: Safety guardrails warning before destructive commands (`rm -rf`, `DROP TABLE`, `git reset --hard`).
- `/freeze`: Lock edits strictly to designated directories during targeted debugging.
- `/guard`: Full production safety activation (`/careful` + `/freeze`).
- `/unfreeze`: Remove directory editing restrictions.

### Release & DevOps
- `/ship`: Sync main branch, verify test suite coverage, push, and create Pull Requests.
- `/land-and-deploy`: Merge approved PRs, monitor CI/CD, and verify production health.
- `/canary`: Post-deploy monitoring loop for console errors and performance regressions.
- `/benchmark`: Baseline load times, Core Web Vitals, and resource size audits on PRs.
- `/setup-deploy`: One-time automated setup for production deployment URLs and commands.

### Documentation & Memory
- `/document-release`: Audit and synchronize project docs (`README`, `ARCHITECTURE`, `TODOs`) with recent diffs.
- `/document-generate`: Generate missing Diataxis documentation (tutorials, how-to guides, reference).
- `/diagram`: Generate editable Mermaid / Excalidraw / SVG diagrams.
- `/make-pdf`: Export publication-quality PDFs with embedded vector diagrams.
- `/retro`: Weekly team engineering retrospective and health metrics.
- `/learn`: Persistent memory manager for repo-specific patterns, preferences, and pitfalls.
- `/pair-agent`: Coordinate multi-agent shared browser sessions.