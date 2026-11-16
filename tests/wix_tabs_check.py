"""Kør efter udgivelse: kontrollerer, at fanerne på porteføljesiden ruller inde i Wix-rammen.

    python3 tests/wix_tabs_check.py

Åbner den rigtige Wix-side, finder graf-rammen og klikker på hver fane ved mobil- og desktopbredde.
Testen fejler, hvis siden ikke flytter sig, eller hvis der kommer JavaScript-fejl i rammen.
"""
import sys
from playwright.sync_api import sync_playwright

URL = 'https://www.newdealinvest.dk/graf-review?side=portfolio%2Findex'
FANER = ['Risiko i tal', 'Afstand til toppen', 'Fordeling & selskaber', 'Nedture & afkast', 'Datagrundlag', 'Overblik']
fejl = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for navn, w, h in [('mobil', 390, 844), ('desktop', 1440, 900)]:
        pg = b.new_page(viewport={'width': w, 'height': h})
        js = []
        pg.on('pageerror', lambda e: js.append(str(e)[:150]))
        pg.goto(URL, wait_until='domcontentloaded')
        frame = None
        for _ in range(60):
            frame = next((f for f in pg.frames if '/graph/v19-review/' in f.url and 'portfolio' in f.url), None)
            if frame:
                try:
                    frame.wait_for_selector('#analysis-nav a', timeout=1000)
                    break
                except Exception:
                    pass
            pg.wait_for_timeout(1000)
        if not frame:
            fejl.append(f'{navn}: fandt ikke graf-rammen')
            continue
        frame.wait_for_timeout(2000)
        forrige = frame.evaluate('scrollY')
        for t in FANER:
            frame.locator('#analysis-nav a', has_text=t).first.click()
            frame.wait_for_timeout(900)
            y = frame.evaluate('scrollY')
            aktiv = frame.evaluate('document.querySelector("#analysis-nav [aria-current]")?.textContent || ""')
            print(f'{navn} {t}: scrollY {forrige} -> {y}, aktiv fane: {aktiv}')
            if y == forrige:
                fejl.append(f'{navn}: fanen "{t}" flyttede ikke siden')
            forrige = y
        if js:
            fejl.append(f'{navn}: JavaScript-fejl {js[:3]}')
        pg.close()
    b.close()
if fejl:
    print('FEJL:\n' + '\n'.join(fejl))
    sys.exit(1)
print('OK: alle faner ruller inde i Wix-rammen')
