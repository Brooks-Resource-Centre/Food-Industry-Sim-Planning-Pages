# Layouts

There is no layout component. Every page repeats the same header and footer markup (copy-pasted across 5 HTML files). Only `aria-current="page"` on the nav link changes.

## Header (all pages)

```html
<header class="site"><div class="wrap">
  <a class="brand" href="index.html">Food Premises Audit <span>Sim Scenario Planner</span></a>
  <nav aria-label="Main">
    <a href="index.html" aria-current="page">Home</a>
    <a href="scenario.html">Plan a Scenario</a>
    <a href="scenario.html?example=1">Pilot Scenario</a>
    <a href="resources.html">Resources</a>
    <a href="team.html">Team Guide</a>
  </nav>
</div></header>
```

Black bar, 6px MMU-blue bottom border, white brand text with blue sub-label, nav links white with blue underline on hover/current.

## Page shell

```html
<main><div class="wrap"> ...page content... </div></main>
```

## Footer (all pages)

```html
<footer class="site"><div class="wrap">Planning tool for a food premises audit simulation training project. Unofficial, uses MMU-style colours.</div></footer>
```

Light grey bar, 6px blue top border, small muted text.
