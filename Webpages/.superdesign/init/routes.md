# Routes

Static multi-page site, served from `docs/` (GitHub Pages). File-based; no router.

| URL | File | Purpose |
|---|---|---|
| `/index.html` | `docs/index.html` | Landing: intro, 3 steps, two CTAs, guidance, privacy note |
| `/scenario.html` | `docs/scenario.html` (+ `docs/scenario.js`) | 11-section planning form for academics (repeating learning objectives, faults, records, assets), sticky action toolbar, Word / JSON export |
| `/scenario.html?example=1` | same | Read-only "Pilot Scenario" (pre-filled), shows a banner |
| `/resources.html` | `docs/resources.html` | Assets guide: how it works, asset types table, common resources table, planning tips |
| `/team.html` | `docs/team.html` | Dev-team guide: workflow, Unity layout, data shape, budgets |

All pages share `docs/style.css`. Only `scenario.html` loads JS (`scenario.js`, plus the `docx` library from a CDN).

Audience: academics at MMU planning a food-premises audit simulation (non-technical), plus a development team.
