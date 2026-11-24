# Extractable components

No framework components exist; these are the repeated HTML blocks that could become reusable components.

## SiteHeader
- Source: header block repeated in every `docs/*.html`
- Category: layout
- Description: Black top bar with brand text and five nav links
- Extractable props: activeItem (string, default: "home"; one of home | plan | pilot | resources | team)
- Hardcoded: brand text "Food Premises Audit" + "Sim Scenario Planner", link labels and hrefs, all CSS

## SiteFooter
- Source: footer block repeated in every `docs/*.html`
- Category: layout
- Description: Light grey footer line with the project statement
- Extractable props: none
- Hardcoded: text, all CSS
