# Theme

## Token summary

Colours (MMU website palette: black, white, off-white, bright blue accent):

| Token | Value | Use |
|---|---|---|
| `--black` | `#101010` | header, table headers, button borders, links |
| `--accent` | `#00afff` | MMU blue: primary buttons, borders, underlines, step circles |
| `--accent-soft` | `#e0f5ff` | note cards, banner background |
| `--grey` | `#f2f0f0` | footer, fault card title bar, code background |
| `--line` | `#d5d5d5` | card and table borders |
| `--text` | `#212121` | body text |
| `--muted` | `#595959` | hints, footer text |
| `--crit` / `--major` / `--minor` | `#f4b6b6` / `#fbd9a6` / `#fff2b3` | severity chips and Word cells (semantic, keep) |

Type: Arial, Helvetica, sans-serif. Body 16px/1.55. h1 2rem, h2 1.35rem (with 4px blue underline), h3 1.05rem, `.lead` 1.15rem, `.hint` .93rem.
Spacing: 4/8/10/12/14/16/18/24/28/32px ad hoc. Radius: 4px (buttons, inputs), 6px (cards), 10px (pills). No shadows (focus ring uses a 5px blue box-shadow).
Layout: container 980px, breakpoint 680px (grids collapse), sticky toolbar disabled under 700px height.
Accessibility: 3px black focus outline plus blue halo. Black text on blue only (white on #00afff fails contrast).

## Raw source: docs/style.css

```css
/* Colours taken from the MMU website: black, white, off-white and the bright blue accent (#00afff). Change them here if the brand palette changes. */
:root {
  --black: #101010;
  --accent: #00afff;
  --accent-soft: #e0f5ff;
  --grey: #f2f0f0;
  --line: #d5d5d5;
  --text: #212121;
  --muted: #595959;
  --crit: #f4b6b6;
  --major: #fbd9a6;
  --minor: #fff2b3;
}
* { box-sizing: border-box; }
body { margin: 0; font: 16px/1.55 Arial, Helvetica, sans-serif; color: var(--text); background: #fff; }
.wrap { max-width: 980px; margin: 0 auto; padding: 0 16px; }
a { color: var(--black); text-decoration-color: var(--accent); text-decoration-thickness: 3px; text-underline-offset: 3px; }
a:hover { background: var(--accent); }
:focus-visible { outline: 3px solid var(--black); outline-offset: 2px; box-shadow: 0 0 0 5px var(--accent); }

header.site { background: var(--black); border-bottom: 6px solid var(--accent); }
header.site .wrap { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 24px; padding-top: 14px; padding-bottom: 14px; }
.brand { color: #fff; font-weight: 700; font-size: 1.1rem; text-decoration: none; }
.brand span { color: var(--accent); font-weight: 400; margin-left: 8px; }
.brand:hover { background: none; }
nav { display: flex; flex-wrap: wrap; gap: 4px 18px; }
nav a { color: #fff; text-decoration: none; padding: 4px 2px; border-bottom: 3px solid transparent; }
nav a:hover { background: none; border-bottom-color: var(--accent); }
nav a[aria-current="page"] { border-bottom-color: var(--accent); font-weight: 700; }

main { padding: 28px 0 56px; }
h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 12px; }
h2 { font-size: 1.35rem; margin: 32px 0 10px; padding-bottom: 6px; border-bottom: 4px solid var(--accent); }
h3 { font-size: 1.05rem; margin: 20px 0 6px; }
.lead { font-size: 1.15rem; }
.muted { color: var(--muted); }
.hint { color: var(--muted); font-size: .93rem; margin: 0 0 10px; }

.btn { display: inline-block; font: inherit; font-weight: 700; padding: 10px 18px; border: 2px solid var(--black); background: var(--accent); color: var(--black); text-decoration: none; cursor: pointer; border-radius: 4px; }
.btn:hover { background: var(--black); color: var(--accent); }
.btn.secondary { background: #fff; }
.btn.secondary:hover { background: var(--black); color: #fff; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; margin: 16px 0; }
button.link { font: inherit; background: none; border: 0; padding: 0; color: var(--black); text-decoration: underline; cursor: pointer; }

.steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; padding: 0; list-style: none; margin: 20px 0; counter-reset: s; }
.steps li { counter-increment: s; border: 2px solid var(--black); border-radius: 6px; padding: 14px 16px; }
.steps li::before { content: counter(s); display: block; background: var(--accent); border: 2px solid var(--black); border-radius: 50%; width: 30px; height: 30px; text-align: center; font-weight: 700; line-height: 26px; margin-bottom: 6px; }

.card { border: 1px solid var(--line); border-radius: 6px; padding: 16px; margin: 12px 0; background: #fff; }
.card.note { background: var(--accent-soft); border-color: var(--accent); }
label { display: block; margin: 10px 0; font-weight: 700; }
label > span { display: block; margin-bottom: 4px; }
.sr { position: absolute; left: -9999px; }
label.check { font-weight: 400; display: flex; gap: 10px; align-items: flex-start; margin: 6px 0; }
label.check input { width: 20px; height: 20px; margin-top: 2px; flex: none; }
input[type=text], textarea, select { width: 100%; font: inherit; font-weight: 400; padding: 8px 10px; border: 2px solid #8a8a85; border-radius: 4px; background: #fff; color: var(--text); }
textarea { resize: vertical; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0 12px; }
@media (max-width: 680px) { .grid2, .grid4 { grid-template-columns: 1fr; } }

.fault-head { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid var(--accent); margin: -16px -16px 8px; padding: 8px 16px; background: var(--grey); }
.sev-key { margin: 8px 0 16px; padding-left: 18px; }
.sev-key li { margin: 4px 0; }
.pill { display: inline-block; padding: 0 8px; border-radius: 10px; font-weight: 700; font-size: .85rem; }
.pill.crit { background: var(--crit); } .pill.major { background: var(--major); } .pill.minor { background: var(--minor); }

.toolbar { position: sticky; bottom: 0; background: #fff; border-top: 4px solid var(--accent); padding: 10px 0; margin-top: 24px; z-index: 5; }
@media (max-height: 700px), (max-width: 680px) { .toolbar { position: static; } }
.banner { background: var(--accent-soft); border: 2px solid var(--accent); padding: 10px 14px; border-radius: 6px; margin-bottom: 14px; }
#status { min-height: 1.4em; margin: 6px 0 0; font-size: .93rem; }

.tbl-wrap { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; margin: 8px 0 16px; }
th, td { border: 1px solid var(--line); padding: 8px 10px; text-align: left; vertical-align: top; }
th { background: var(--black); color: #fff; font-size: .93rem; }
td input, td select { padding: 4px 6px; }
pre { background: var(--grey); border: 1px solid var(--line); padding: 14px; overflow-x: auto; border-radius: 6px; font-size: .9rem; }
code { background: var(--grey); padding: 1px 5px; border-radius: 3px; }
pre code { background: none; padding: 0; }

footer.site { border-top: 6px solid var(--accent); background: var(--grey); padding: 18px 0; color: var(--muted); font-size: .9rem; }

@media print {
  header.site, footer.site, .toolbar, .actions, .banner { display: none; }
  main { padding: 0; }
}
```
