# Pages: dependency trees

Every page depends on the shared stylesheet. Header and footer are inline markup (see `layouts.md`).

## / (Landing)
Entry: `docs/index.html`
- `docs/style.css`

## /scenario.html (Planning form, 11 sections)
Entry: `docs/scenario.html`
- `docs/style.css`
- `docs/scenario.js` (renders repeating cards: learning objectives `.outcome`, faults `.fault`, records `.rec`, assets `.asset`; Word export via `docx` CDN)

## /resources.html
Entry: `docs/resources.html`
- `docs/style.css`

## /team.html
Entry: `docs/team.html`
- `docs/style.css`
