# Portfolio review — 31 October 2026

## Changes
- Widget has two visual entrances; portfolio graphic uses actual PMINDI history and sector weights. Both share classes remain selectable in the widget; deeper analysis remains PMINDI.
- Portfolio opens with returns and key figures, followed by risk, distance to highs, sectors/holdings and historical drawdowns.
- Sector area map replaces bars; fields and legend filter holdings. Existing 52-week histogram and colours retained.
- Holdings sort ascending/descending by weight and daily, weekly, monthly and longer changes. Gains/losses use green/red.
- Weekly price changes added for all 373 positions from read-only Yahoo histories. Date, close and currency match the existing review snapshot for every position. No production job changed.
- 13 short-history positions show distance from the available observed high with start date. They are not misrepresented as full 52-week records.
- Explanations added for drawdowns, rolling returns, risk and price-period methodology.

## Verification
- Rebuilt from review-input. 16 automated tests pass, including supplemental price matching and calculation/rejection cases.
- Browser: desktop and 390px mobile; widget cards, portfolio landing, sectors, filters, weekly and daily sort both directions, positive/negative colours, partial-history highs.
- Final mobile landing has no page overflow or console errors. Desktop and mobile cards visually checked after actual-history graphic update.

## Scope
Review branch only. No main merge, Wix, Azure or live-site modification. This remains a dated review snapshot (holdings 30 October, fund NAV 29 October), not a new automatic data pipeline.
New Designbygger/Critiquito image package is pending its GitHub location; no visual proposals rejected without inspecting images.
