# Animation review — 31 October 2026

Source: Claude branch 52c606aa97d7cbd99b1b73ce87cd0436d4bb5176.
Decision: accept the functional changes for the integrated review build. No main merge or public deployment in this review.

The build overlays the four animation assets onto v19-review, replaces only the SpaceX hero SVG, and versions JS/CSS references. Original V18 remains unchanged. Existing SpaceX layout/history and widget/navigation work remain intact.

Verified independently in the integrated local browser:
- eToro desktop and 390px: waiting/playing/end states; replay, pause and resume; 44px control; no horizontal page overflow.
- SpaceX 390px: waiting and end state, replay -> playing -> pause; no horizontal overflow.
- SpaceX 768px tablet: illustration visible after scrolling to it, playback starts and control visible; no horizontal overflow.
- SpaceX desktop: hero and position-history layout preserved.
- Eight automatic build checks pass, including all 21 script references, cache versions and equality of standalone/inline SpaceX SVG (normalised line endings).
- Both delivered scripts passed Node syntax checks during import.

Code review: removing pointer.js hero handling removes duplicate control listeners; pathLength=1 aligns the trail timing with animateMotion; visibility gating and a replay control address the missed-start symptom. No network/data changes.

Limits: actual iOS Safari/Android, Firefox and reduced-motion behaviour were not independently rerun here. Claude reports reduced-motion and WebKitGTK checks; those are supplier results, not our verification. Do not claim the original device-specific issue is proven fixed on a real phone. The SpaceX art remains subtle, particularly in light mode; this is a playback correction, not a redesigned illustration.
