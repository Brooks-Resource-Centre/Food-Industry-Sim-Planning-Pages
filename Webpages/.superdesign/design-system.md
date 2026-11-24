# Design system: Sim Scenario Planner

## Product context
A static web tool that lets MMU (Manchester Metropolitan University) academics plan a food premises audit simulation scenario in plain language and download it as a formatted Word document for a development team. Audience: non-technical food-science academics (primary), a development team (secondary). Tone: clear, calm, practical, no jargon, no game language.

Pages: Home (intro + 3 steps), Plan a Scenario (long 11-section form with repeating cards and a sticky action toolbar), Pilot Scenario (same form pre-filled), Resources (asset guide tables), Team Guide (dev documentation, code blocks, tables).

## Brand and style
MMU-style palette taken from mmu.ac.uk: black, white, off-white, bright blue accent.

- Black `#101010`, accent blue `#00afff`, soft blue `#e0f5ff`, off-white grey `#f2f0f0`, line `#d5d5d5`, text `#212121`, muted `#595959`.
- Severity colours (semantic, keep): critical `#f4b6b6`, major `#fbd9a6`, minor `#fff2b3`.
- Black text on the blue accent only (white on `#00afff` fails contrast).
- Font: Arial / Helvetica. Body 16px, line-height 1.55. h1 2rem, h2 1.35rem with a 4px blue underline.
- Shape: 4px radius inputs and buttons, 6px cards, flat (no shadows), strong 2px black outlines on buttons and step cards, 6px blue rules on header bottom and footer top.
- Buttons: primary blue fill with black text and black border, hover inverts to black fill. Secondary white.
- Header: black bar, white brand with blue sub-label, nav links with blue underline for hover/current.
- Accessibility: visible focus (3px black outline + blue halo), labels above inputs, contrast AA.

## Layout
980px max container, 16px gutter, mobile friendly (grids collapse under 680px). Forms use stacked cards. Sticky bottom toolbar on the form (static on short or narrow screens).

## Constraints
Static HTML/CSS/vanilla JS only. No frameworks. Keep the existing class names and structure so changes port back into `docs/style.css` and the HTML.

## Motion
None required. Keep any transitions subtle (under 150ms) and respect reduced motion.
