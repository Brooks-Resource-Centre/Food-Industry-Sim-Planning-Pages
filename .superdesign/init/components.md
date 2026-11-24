# Components

Framework: none. Plain static HTML + one shared stylesheet (`docs/style.css`) + vanilla JS. No component library, no Tailwind, no build step. "Components" are CSS classes in `docs/style.css` used directly in HTML.

Shared primitives (class → purpose):

- `.wrap` – centred 980px container with 16px gutter
- `.btn` / `.btn.secondary` – primary (MMU blue fill, black text, 2px black border) / secondary (white) buttons. Hover inverts to black fill.
- `button.link` – underline text button (Remove)
- `.actions` – flex row of buttons
- `.card` / `.card.note` – bordered panel / blue-tinted note panel
- `.steps` – 3-up numbered step cards (counter circle in blue)
- `.grid2` / `.grid4` – form grids (collapse to 1 col under 680px)
- `label`, `input[type=text]`, `textarea`, `select` – form fields (2px grey border)
- `label.check` – checkbox row
- `.pill.crit|.major|.minor` – severity chips
- `.fault-head` – grey title bar inside a fault card with blue bottom border
- `.toolbar` – sticky bottom action bar on the planning form
- `.banner` – blue-tinted info banner
- `table`, `th` (black header, white text), `td`, `.tbl-wrap`
- `pre`, `code`

Full source for all of the above is `docs/style.css` (88 lines), reproduced in `theme.md`.

Example usage (from `docs/index.html`):

```html
<ol class="steps">
  <li><strong>Fill in the form</strong><br>Plain language, no technical or game knowledge needed. Your answers save in your browser as you type.</li>
  <li><strong>Download it as Word</strong><br>One click gives you a formatted document to review, share or send to the team.</li>
  <li><strong>Hand it over</strong><br>The team uses it to build the scenario, then you try it with students.</li>
</ol>
<div class="actions">
  <a class="btn" href="scenario.html">Start planning a scenario</a>
  <a class="btn secondary" href="scenario.html?example=1">See the pilot scenario</a>
</div>
<div class="card note"><strong>Your work stays on your computer.</strong> ...</div>
```
