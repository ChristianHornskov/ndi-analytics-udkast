"""Indsæt/opdatér delings-preview (Open Graph + Twitter) i alle docs/**/*.html.

Idempotent: blokken mellem <!-- og:start --> og <!-- og:end --> erstattes ved hver kørsel.
Beskrivelse = <meta name="description"> eller sidens .lede (ingen afkasttal i preview-tekst).
Kør: python3 scripts/og-meta.py
"""
import html
import pathlib
import re

BASE = 'https://christianhornskov.github.io/ndi-analytics-udkast/'
DOCS = pathlib.Path(__file__).resolve().parent.parent / 'docs'
DEFAULT_DESC = 'NDI Analytics - klikbart udkast. Fonden, porteføljen og tech-temaer set gennem NDI\'s linse. Generel information, ikke rådgivning.'
SKIP = {'notes/index.html'}
NUM = re.compile(r'[+-]?\d+[.,]?\d*\s?%')


def text(s):
    return html.unescape(re.sub(r'<[^>]+>', '', s)).strip()


def main():
    n = 0
    for p in sorted(DOCS.rglob('*.html')):
        rel = p.relative_to(DOCS).as_posix()
        if rel in SKIP:
            continue
        src = p.read_text(encoding='utf-8')
        if '</head>' not in src:
            continue
        title = text(re.search(r'<title>(.*?)</title>', src, re.S).group(1)) if '<title>' in src else 'NDI Analytics'
        m = re.search(r'<meta name="description" content="([^"]*)"', src)
        desc = html.unescape(m.group(1)) if m else ''
        if not desc:
            lede = re.search(r'<p class="lede">(.*?)</p>', src, re.S)
            desc = text(lede.group(1)) if lede else DEFAULT_DESC
        if NUM.search(desc) or '${' in desc:  # aldrig procenttal; JS-skabelon-lede er ikke statisk tekst
            desc = DEFAULT_DESC
        desc = re.sub(r'\s+', ' ', desc)[:200]
        url = BASE + ('' if rel == 'index.html' else rel)
        esc = lambda s: html.escape(s, quote=True)
        block = (
            '<!-- og:start -->\n'
            f' <meta property="og:type" content="website">\n'
            f' <meta property="og:site_name" content="NDI Analytics (udkast)">\n'
            f' <meta property="og:locale" content="da_DK">\n'
            f' <meta property="og:title" content="{esc(title)}">\n'
            f' <meta property="og:description" content="{esc(desc)}">\n'
            f' <meta property="og:url" content="{esc(url)}">\n'
            f' <meta property="og:image" content="{BASE}assets/og-card.png">\n'
            f' <meta property="og:image:width" content="1200">\n'
            f' <meta property="og:image:height" content="630">\n'
            f' <meta property="og:image:alt" content="NDI Analytics - udkast. Gå på opdagelse i porteføljen.">\n'
            f' <meta name="twitter:card" content="summary_large_image">\n'
            ' <!-- og:end -->'
        )
        # Fjern løse og:/twitter:-tags uden for blokken (fx relative og:image, som previews ikke kan hente)
        outside = re.sub(r'<!-- og:start -->.*?<!-- og:end -->', '', src, flags=re.S)
        for tag in re.findall(r'[ \t]*<meta (?:property="og:|name="twitter:)[^>]*>\n?', outside):
            src = src.replace(tag, '', 1)
        if '<!-- og:start -->' in src:
            out = re.sub(r'<!-- og:start -->.*?<!-- og:end -->', block, src, flags=re.S)
        else:
            out = src.replace('</head>', f'  {block}\n</head>', 1)
        if out != p.read_text(encoding='utf-8'):
            p.write_text(out, encoding='utf-8')
            n += 1
    print(f'og-meta: {n} filer opdateret')


if __name__ == '__main__':
    main()
