# User journey and mobile review — 31 October 2026

Scope: selected items 2, 3, 4 and 6 only. Existing visual design retained. No main merge, Wix publication, cloud-job changes, new data source or compliance review.

## Changes
- Corrected legacy menu links which went via the obsolete index redirect. Portfolio, themes, risk and methodology now have distinct destinations.
- Added breadcrumbs and short section navigation to theme/company pages. Removed the redundant company back-link. Company rows in the portfolio link to their matching page when the existing names match exactly.
- Fixed company sidebar overflow which clipped percentages. Long company headings no longer leave a single letter on a separate mobile line.
- Health's three cramped mobile cards are stacked; form selectors are readable/touch-sized. Removed redundant theme introduction boxes on Physical AI and Quantum. The empty Fintech distribution section now shows three existing snapshot positions with links.
- Shortened paths to existing illustration assets so Windows preview does not lose images to path-length limits. Original assets retained; no new stock illustrations substituted.
- Kept two videos/posts initially visible with explicit expansion for the rest. Video captions state topic and starting timestamp. X renders actual embeds on mobile too, with an original-post link and visible failure state. Instagram failures can be retried. Third-party scripts are reused instead of duplicated.
- Added lazy loading where applicable and removed accumulated inter-tag whitespace. No claim of a measured production speedup.

## Verification
- 14 automated tests pass. All 488 HTML pages checked for local image/script/stylesheet existence and internal HTML destinations. Section shortcuts resolve. Existing market snapshot is byte-identical to source. Company-route targets exist. Media lists have at most two initial cards and excluded video IDs remain excluded.
- JavaScript syntax checked for journey, review-media and theme-X scripts.
- Browser mobile review at 390 × 844: widget → portfolio → Tesla, portfolio → tech, all 12 theme illustrations, and top sections of the ten largest company pages. More detailed checks of Tesla and SpaceX.
- Desktop 1440 × 1000: chip chain and company directory in light/dark; corrected sidebar width verified. Mobile Health, Fintech, Software illustrations and Sivers heading rechecked after fixes.
- Interaction checks: mobile menu, section navigation, company search, direct AI-ring zoom (1→2) and direct layer selection (→4), Tesla YouTube starting at 31:01, SpaceX Instagram and native X embedding.
- Warm local-browser samples only: Chips LCP 116 ms, no long task in initial sample; Datacenter LCP 116 ms, no long task; Quantum LCP 152 ms, one 55 ms long task. These are not cold-network or physical-phone benchmarks. Chips markup reduced 3.0%, SpaceX 4.3%, Energy 0.7% versus previous commit.

## Honest limits / deferred
- All 488 pages received static checks; not all were individually visually reviewed. The twelve themes and ten largest company introductions were sampled visually as described above.
- Playback was sampled, not every video/transcript watched. Existing source classifications and flagged exclusions retained.
- X, Instagram and YouTube remain dependent on external availability, browser privacy settings and their providers. Fallback links remain.
- No new Grok/Claude ten-item review integrated in this pass. No automatic daily data feed added. No compliance decision or Wix/live release.
- The review still uses its dated data snapshot. It should not be represented as a production-ready live data service.
