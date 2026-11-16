import sys,json,threading,functools,http.server,os,tempfile,mimetypes
from urllib.parse import urlsplit,unquote
from pathlib import Path
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright
site=Path(__file__).resolve().parents[1]/'docs/energi-konkurrence/v19-review';out=Path(tempfile.mkdtemp(prefix='ndi-review-tests-'))
class H(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,a,b):
  try:super().copyfile(a,b)
  except (ConnectionAbortedError,ConnectionResetError,BrokenPipeError):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(H,directory=str(site)));threading.Thread(target=server.serve_forever,daemon=True).start()
checks=[]
with sync_playwright() as p:
 b=p.chromium.launch(**({'executable_path':os.environ['CHROME_PATH']} if os.environ.get('CHROME_PATH') else {}));page=b.new_page(viewport={'width':1300,'height':950})
 def render(slug,live=True,ratio=None,stale=False,currency='USD'):
  page.goto('about:blank');page.set_content('<div class="cr-noegletal" data-noegletal="'+slug+'"></div><div id="aktiekurs"></div>')
  page.add_script_tag(path=str(site/('data/noegletal/'+slug+'.js')))
  if ratio is not None:page.evaluate('(r)=>window.NDI_NOEGLETAL["'+slug+'"].adsForhold=r',ratio)
  if stale:page.evaluate('()=>{let n=Object.values(window.NDI_NOEGLETAL)[0];n.aktie.kurs=123;n.aktie.dato="2020-01-01";n.aktie.markedsvaerdi=1000}')
  if live:page.evaluate('''([slug,currency])=>{window.NDI_LIVE={files:{'data.json':{funds:[{id:'pmindi',positions:[{isin:'TEST',weight:1}]}]},'highs.json':{funds:[{short:'PMINDI',rows:[{isin:'TEST',status:'ok',marketClose:100,marketCurrency:currency,returnDate:'2026-11-13',ticker:'TEST',distance:0}]}]}},identities:{TEST:{slug}}}}''',[slug,currency])
  page.evaluate('window.NDI_KEYFIGURES_READY=Promise.resolve(window.NDI_NOEGLETAL)')
  page.add_script_tag(path=str(site/'assets/claude/21-noegletal.js'));page.wait_for_function('!document.querySelector(".cr-noegletal").textContent.includes("Henter")');return page.inner_text('body')
 text=render('silicon-motion');assert '3,4 mia. USD' in text and '2,1 ×' in text and '4 aktier pr. ADS' in text;checks.append('ADS 4:1 correct')
 assert '13,6 mia. USD' in render('silicon-motion',ratio=1);checks.append('ordinary shares unchanged')
 assert 'Markedsværdi' not in render('silicon-motion',ratio=0);checks.append('invalid ADS ratio hidden')
 text=render('silicon-motion',live=False,stale=True);assert 'Seneste lukkekurs' not in text and 'Markedsværdi' not in text;checks.append('no static quote fallback')
 text=render('silicon-motion',currency='EUR');assert 'Markedsværdi\n' not in text and '100,00EUR' in text;checks.append('currency mismatch cannot value company')
 for f in sorted((site/'data/noegletal').glob('*.js')):
  text=render(f.stem,live=False);assert 'NaN' not in text and 'Infinity' not in text,f.stem
 checks.append('all local company datasets render without NaN')
 # Actual pages: mobile/desktop, dark/light tables, no live provider required.
 def local_asset(route):
  if not route.request.url.startswith('http://127.0.0.1:'):return route.abort()
  f=site/unquote(urlsplit(route.request.url).path).lstrip('/')
  if f.is_file():return route.fulfill(body=f.read_bytes(),content_type=mimetypes.guess_type(f.name)[0] or 'application/octet-stream')
  return route.fulfill(status=404,body='Not found')
 page.route('**/*',local_asset)
 for width in [390,792,1440]:
  page.set_viewport_size({'width':width,'height':950})
  for theme in ['fintech','platforme','raastoffer','software']:
   page.goto('http://127.0.0.1:'+str(server.server_port)+'/temaer/'+theme+'.html',wait_until='domcontentloaded');page.wait_for_timeout(200)
   for mode in ['lys','mørk']:
    page.evaluate('(m)=>document.documentElement.setAttribute("data-tema",m)',mode)
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(theme,width,mode)
    box=page.locator('.cf-kort').first
    if theme in ['fintech','platforme']:box=page.locator('.cf-tabel').first
    if box.count():box.screenshot(path=str(out/f'{theme}-{width}-{mode}.png'))
    if theme in ['fintech','platforme'] and width==390:
     a=page.locator('.cf-tabel td').first.bounding_box();t=page.locator('.cf-tabel').first.bounding_box();assert a['width']>=t['width']-2
 checks.append('4 themes at 390/792/1440 dark/light: no overflow, mobile headings full width')
 b.close()
server.shutdown();(out/'test-results.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(checks,ensure_ascii=False,indent=2))
