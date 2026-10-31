"""Bygger chipkæde-komponenten (snippet, CSS og JS) ud fra data.json.

data.json er trukket ud af den eksisterende sektion #cq-kaede på
v19-review/temaer/chips.html, så tekster, selskaber, logoer og andele er de
samme som på siden.
"""
import json, html, os

HER = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(HER, "data.json"), encoding="utf-8"))
UD_DIR = HER
os.makedirs(UD_DIR, exist_ok=True)
esc = lambda s: html.escape(s, quote=True)

# ---------- geometri (dimetrisk projektion) ----------
C, S, K = 0.92, 0.39, 0.6
OX, OY = 70, 650

def P(u, v, z=0):
    return (OX + (u + v) * C * K, OY + (v - u) * S * K - z * K)

def pts(*ps):
    return " ".join(f"{x:.1f},{y:.1f}" for x, y in ps)

def path(*ps):
    return "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in ps)

def topmat(u, v, h, f=1.2):
    x, y = P(u, v, h)
    return f"matrix({C*K*f:.4f},{-S*K*f:.4f},{C*K*f:.4f},{S*K*f:.4f},{x:.1f},{y:.1f})"

def box(u, v, a, h, kls="ck-sojle"):
    b = a / 2
    t = [P(u-b, v-b, h), P(u+b, v-b, h), P(u+b, v+b, h), P(u-b, v+b, h)]
    fr = [P(u-b, v+b, h), P(u+b, v+b, h), P(u+b, v+b, 0), P(u-b, v+b, 0)]
    lf = [P(u-b, v-b, h), P(u-b, v+b, h), P(u-b, v+b, 0), P(u-b, v-b, 0)]
    return (f'<g class="{kls}"><polygon class="ck-f-v" points="{pts(*lf)}"/>'
            f'<polygon class="ck-f-h" points="{pts(*fr)}"/>'
            f'<polygon class="ck-f-t" points="{pts(*t)}"/>'
            f'<polyline class="ck-kant" points="{pts(t[3], t[0], t[1])}"/>'
            f'<polyline class="ck-kant ck-kant--svag" points="{pts(t[3], t[2], t[1])}"/></g>')

ICON = {
 "tegnes": '<rect x="-24" y="-24" width="48" height="48" rx="4"/><path d="M-24 -8h48M-24 8h48M-8 -24v48M8 -24v48" stroke-opacity=".3"/><path d="M-16 -14h14v12h12v14" stroke-width="3"/><circle cx="10" cy="12" r="3" class="ck-fyld"/><circle cx="-16" cy="-14" r="3" class="ck-fyld"/>',
 "materialer": '<circle r="26"/><g class="ck-fyld" fill-opacity=".55" stroke="none">' + "".join(
        f'<rect x="{x-4}" y="{y-4}" width="8" height="8" rx="1"/>' for x in range(-18, 19, 9) for y in range(-18, 19, 9) if x*x + y*y < 22*22) + '</g>',
 "maskiner": '<circle r="26"/><g class="ck-fyld" fill-opacity=".35" stroke="none">' + "".join(
        f'<rect x="{x-4}" y="{y-4}" width="8" height="8" rx="1"/>' for x in range(-18, 19, 9) for y in range(-18, 19, 9) if x*x + y*y < 22*22) + '</g><path d="M-26 0h52M0 -26v52" stroke-opacity=".35"/>',
 "fremstilles": '<rect x="-24" y="-24" width="48" height="48" rx="3"/><rect x="-16" y="-16" width="32" height="32" rx="2" stroke-opacity=".7"/><rect x="-8" y="-8" width="16" height="16" rx="2" class="ck-fyld" fill-opacity=".35"/>',
 "samles": '<rect x="-18" y="-18" width="36" height="36" rx="4"/><rect x="-9" y="-9" width="18" height="18" rx="2" class="ck-fyld" fill-opacity=".35"/>' + "".join(
        f'<path d="M{p} -18v-8M{p} 18v8M-18 {p}h-8M18 {p}h8"/>' for p in (-10, 0, 10)),
 "regner": '<rect x="-22" y="-22" width="44" height="44" rx="4"/>' + "".join(
        f'<rect x="{x}" y="{y}" width="10" height="10" rx="1.5" class="ck-fyld" fill-opacity=".45"/>' for x in (-14, 4) for y in (-14, 4)),
 "husker": "".join(f'<rect x="-22" y="{y}" width="44" height="10" rx="2" class="ck-fyld" fill-opacity=".25"/>' for y in (-20, -5, 10)),
 "styrer": '<path d="M-24 8c6 0 6-16 12-16s6 16 12 16 6-16 12-16 6 16 12 16" stroke-width="3"/><path d="M4 -24l-8 14h9l-6 12" stroke-width="3"/>',
}
FARVE = ["#5f8c93", "#6c9aa1", "#86b4ba", "#a6cbd0", "#c7e0e3", "#e6d79c", "#e6d79c", "#e6d79c"]

maks = max(s["andel"] for s in D)
h_of = lambda w: 26 + 190 * w / maks
A = 130
POS = [(0, 0), (230, 0), (460, 0), (690, 0), (920, 0), (1450, -300), (1450, 0), (1450, 300)]
CHIP_U = 1180
LY = 22
TEGNORDEN = [5, 6, 7, 4, 3, 2, 1, 0]   # bagfra og frem; chippen tegnes efter trin 5 (index 5)

def n_selskaber(n):
    return f"{n} selskab" if n == 1 else f"{n} selskaber"

KORT = {  # korte etiketter i scenen; fulde tekster står i panelet
 "tegnes": ("Tegnes", "Software til chipdesign", "Synopsys, Cadence"),
 "materialer": ("Materialer", "Skiver og kemi", "Soitec, Entegris"),
 "maskiner": ("Maskiner", "Udstyr til fabrikkerne", "Tokyo Electron, ASM"),
 "fremstilles": ("Fremstilles", "Chipfabrikker for andre", "TSMC, GlobalFoundries"),
 "samles": ("Samles og testes", "Pakning og test", "Besi, Advantest"),
 "regner": ("Regner", "Processorer og AI-chips", "NVIDIA, AMD"),
 "husker": ("Husker", "Hukommelse og lagring", "SK hynix, Micron"),
 "styrer": ("Styrer strøm", "Strøm og signaler", "onsemi, ST"),
}
def eksempler(st):
    return KORT[st["slug"]][2]

# ---------- scene ----------
svg = []
board = [P(-140, -430), P(1620, -430), P(1620, 430), P(-140, 430)]
svg.append(f'<polygon class="ck-bord" points="{pts(*board)}"/>')
g = []
for u in range(-140, 1621, 50):
    g.append(path(P(u, -430), P(u, 430)))
for v in range(-430, 431, 50):
    g.append(path(P(-140, v), P(1620, v)))
svg.append(f'<path class="ck-gitter" d="{" ".join(g)}"/>')
dec = []
for v, u0, u1 in [(-300, -100, 700), (-200, 100, 1000), (220, -100, 600), (320, 300, 1100), (-340, 900, 1500)]:
    dec.append(path(P(u0, v), P(u1, v)))
svg.append(f'<path class="ck-pynt" d="{" ".join(dec)}"/>')

# ledningsbaner: et segment pr. trin, så de kan lyse op til og med det aktive trin
spor = []
for i in range(1, 5):
    a = P(POS[i-1][0] + A/2, 0); b = P(POS[i][0] - A/2, 0)
    spor.append((i, path(a, b), "f"))
spor.append((5, path(P(POS[4][0] + A/2, 0), P(CHIP_U - 105, 0)), "f"))     # ind i chippen
for j, i in enumerate((5, 6, 7)):
    u, v = POS[i]
    spor.append((i, path(P(CHIP_U + 105, 0), P(1310, 0), P(1310, v), P(u - A/2, v)), "u"))
for til, d, kind in spor:
    svg.append(f'<g class="ck-spor ck-spor--{kind}" data-til="{til}"><path class="ck-spor-glod" d="{d}"/><path class="ck-spor-linje" d="{d}"/><path class="ck-spor-prik" d="{d}"/></g>')

def trin_g(i):
    st = D[i]; u, v = POS[i]; h = h_of(st["andel"])
    tx, ty = P(u, v, h)
    hx, hy = P(u, v, 0)
    n = len(st["selskaber"])
    label = f"Trin {i+1} af 8: {st['navn']}. {st['sub']}. {n_selskaber(n)}."
    s = [f'<g class="ck-trin{" ck-trin--ud" if i >= 5 else ""}" id="ck-trin-{st["slug"]}" data-i="{i}" data-top="{tx:.1f},{ty:.1f}" '
         f'tabindex="0" role="button" aria-pressed="false" aria-label="{esc(label)}" style="--b:{FARVE[i]}">']
    s.append(f'<ellipse class="ck-halo" cx="{tx:.1f}" cy="{ty+4:.1f}" rx="70" ry="34"/>')
    s.append('<g class="ck-loft">')
    s.append(box(u, v, A, h))
    s.append(f'<g class="ck-ikon" transform="{topmat(u, v, h)}">{ICON[st["slug"]]}</g>')
    s.append('</g>')
    # usynlig, større trykflade
    s.append(f'<polygon class="ck-flade" points="{pts(P(u-A/2-20, v-A/2-20, h+30), P(u+A/2+20, v-A/2-20, h+30), P(u+A/2+20, v+A/2+20, 0), P(u-A/2-20, v+A/2+20, 0))}"/>')
    nr = f"{i+1:02d}"
    if i < 5:
        bx, by = P(u + A/2, A/2, 0); y0 = by + 34; anchor = "middle"; x0 = bx
    else:
        x0, y0, anchor = tx, LY, "middle"
        s.append(f'<line class="ck-ledelinje" x1="{tx:.1f}" y1="{LY+88:.1f}" x2="{tx:.1f}" y2="{ty-4:.1f}"/><circle class="ck-ledeprik" cx="{tx:.1f}" cy="{ty-4:.1f}" r="3"/>')
    s.append(f'<g class="ck-tekst" text-anchor="{anchor}">'
             f'<text class="ck-t-nr" x="{x0:.1f}" y="{y0:.1f}">{nr}</text>'
             f'<text class="ck-t-navn" x="{x0:.1f}" y="{y0+22:.1f}">{esc(KORT[st["slug"]][0])}</text>'
             f'<text class="ck-t-sub" x="{x0:.1f}" y="{y0+41:.1f}">{esc(KORT[st["slug"]][1])}</text>'
             f'<text class="ck-t-ant" x="{x0:.1f}" y="{y0+61:.1f}">{n_selskaber(n)}</text>'
             f'<text class="ck-t-eks" x="{x0:.1f}" y="{y0+78:.1f}">{esc(eksempler(st))}</text></g>')
    s.append('</g>')
    return "".join(s)

def chip():
    s = ['<g class="ck-chip" aria-hidden="true">']
    cx, cy = P(CHIP_U, 0, 0)
    s.append(f'<ellipse class="ck-chip-glod" cx="{cx:.1f}" cy="{cy-30:.1f}" rx="150" ry="90"/>')
    pins = []
    for k in range(-3, 4):
        for (u0, v0, u1, v1) in [(CHIP_U + k*24, -85, CHIP_U + k*24, -108), (CHIP_U + k*24, 85, CHIP_U + k*24, 108),
                                  (CHIP_U - 85, k*24, CHIP_U - 108, k*24), (CHIP_U + 85, k*24, CHIP_U + 108, k*24)]:
            pins.append(path(P(u0, v0, 40), P(u1, v1, 40)))
    s.append(box(CHIP_U, 0, 170, 40, "ck-chip-krop"))
    s.append(f'<path class="ck-ben" d="{" ".join(pins)}"/>')
    s.append(box(CHIP_U, 0, 170, 40, "ck-chip-krop"))
    s.append(f'<g transform="{topmat(CHIP_U, 0, 40, 1)}"><rect class="ck-die" x="-48" y="-48" width="96" height="96" rx="6"/>'
             + "".join(f'<rect class="ck-celle{" ck-celle--lys" if (x + y) % 3 == 0 else ""}" x="{x}" y="{y}" width="9" height="9" rx="1"/>'
                       for x in range(-38, 38, 12) for y in range(-38, 38, 12))
             + '<circle class="ck-fyld-sand" cx="-40" cy="-40" r="3"/></g>')
    fx, fy = P(CHIP_U + 110, 110, 0)
    s.append(f'<text class="ck-t-chip" x="{fx+6:.1f}" y="{fy+30:.1f}" text-anchor="middle">FÆRDIG CHIP</text>'
             f'<text class="ck-t-sub" x="{fx+6:.1f}" y="{fy+50:.1f}" text-anchor="middle">Herfra får den sin opgave</text>')
    s.append('</g>')
    return "".join(s)

lag = []
for i in TEGNORDEN:
    lag.append(trin_g(i))
    if i == 5:
        lag.append(chip())

SVG = (f'<svg class="ck-scene" viewBox="0 0 1208 770" role="group" aria-label="Kæden fra tegning til færdig chip. Vælg et trin.">'
       '<defs><filter id="ck-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>'
       '<filter id="ck-blur2" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="18"/></filter>'
       '<linearGradient id="ck-kegle" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ck-lys);stop-opacity:.9"/>'
       '<stop offset="1" style="stop-color:var(--ck-lys);stop-opacity:.08"/></linearGradient>'
       '<radialGradient id="ck-guld"><stop offset="0" stop-color="#e6d79c" stop-opacity=".30"/><stop offset="1" stop-color="#e6d79c" stop-opacity="0"/></radialGradient>'
       '</defs>' + "".join(svg) + "".join(lag) + '</svg>')

# ---------- mobilliste ----------
li = []
for i, st in enumerate(D):
    if i == 0:
        li.append('<li class="ck-gruppe" aria-hidden="true">Fremstillingen</li>')
    if i == 5:
        li.append('<li class="ck-gruppe ck-gruppe--ud" aria-hidden="true">Den færdige chip</li>')
    n = len(st["selskaber"])
    li.append(f'<li class="ck-punkt" style="--b:{FARVE[i]};--w:{st["andel"]/maks*100:.1f}%">'
              f'<button type="button" class="ck-punkt-knap" data-i="{i}" aria-expanded="false" aria-controls="ck-panel">'
              f'<span class="ck-p-nr">{i+1:02d}</span><span class="ck-p-tekst"><span class="ck-p-navn">{esc(st["navn"])}</span>'
              f'<span class="ck-p-sub">{esc(st["sub"])} · {n_selskaber(n)}</span></span>'
              f'<span class="ck-p-bar" aria-hidden="true"><span></span></span></button></li>')
LISTE = '<ol class="ck-liste" aria-label="Trin i kæden">' + "".join(li) + '</ol>'

def panel_html(i):
    st = D[i]
    return f'<p class="ck-pos">Trin {i+1} af 8 · {"Fremstillingen" if i < 5 else "Den færdige chip"}</p><h3 class="ck-h3">{esc(st["navn"])} <span>{esc(st["sub"])}</span></h3><p class="ck-x">{esc(st["tekst"])}</p>'

data_js = [{"slug": s["slug"], "navn": s["navn"], "sub": s["sub"], "tekst": s["tekst"],
            "selskaber": [{k: c[k] for k in ("navn", "d", "g", "andre", "logo", "mono") if c.get(k)} for c in s["selskaber"]]} for s in D]

SNIPPET = f'''<!-- Chipkæden: erstatter <section id="cq-kaede"> i .v5f-chips. Kræver chipkaede.css og chipkaede.js. -->
<section class="ck" id="ck-kaede" aria-labelledby="ck-h">
 <div class="ck-in">
  <div class="ck-top">
   <div>
    <p class="ck-kick">Fra tegning til færdig chip</p>
    <h2 class="ck-h2" id="ck-h">Sådan bliver <em>en chip</em> til</h2>
    <p class="ck-lead">Fem trin fremstiller chippen. Den færdige chip regner, husker eller styrer strøm. Fonden ejer selskaber i alle otte trin.</p>
   </div>
   <p class="ck-legende"><svg viewBox="0 0 60 56" width="54" height="50" aria-hidden="true"><polygon points="8,40 20,34 32,40 20,46" fill="#86b4ba"/><polygon points="8,40 20,46 20,52 8,46" fill="#2c4a50"/><polygon points="20,46 32,40 32,46 20,52" fill="#1c3237"/><polygon points="34,20 46,14 58,20 46,26" fill="#86b4ba"/><polygon points="34,20 46,26 46,52 34,46" fill="#2c4a50"/><polygon points="46,26 58,20 58,46 46,52" fill="#1c3237"/></svg><span>Søjlens højde viser, hvor stor en del af temaet trinnet udgør i fonden.</span></p>
  </div>
  <div class="ck-scene-ramme">{SVG}</div>
  {LISTE}
  <div class="ck-panel" id="ck-panel" aria-live="polite">
   <div class="ck-panel-streg" aria-hidden="true"></div>
   <div class="ck-panel-tekst">{panel_html(0)}</div>
   <div class="ck-panel-selskaber">
    <ul class="ck-cos" role="list"></ul>
    <p class="ck-info" aria-live="polite">Peg på eller tryk på et selskab for at se, hvad det laver.</p>
   </div>
  </div>
  <p class="ck-fod">Peg på et trin, eller tryk på det, for at se selskaberne. Grupperingen er NewDeal Invests egen. Illustration: NewDeal Invest. Skematisk.</p>
 </div>
 <script type="application/json" id="ck-data">{json.dumps(data_js, ensure_ascii=False)}</script>
</section>
'''
open(os.path.join(UD_DIR, "chipkaede.html"), "w", encoding="utf-8").write(SNIPPET)
print("snippet", len(SNIPPET))

