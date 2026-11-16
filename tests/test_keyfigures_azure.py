"""Browser regression: verified Azure figures, replacement release and failure paths."""
import hashlib,json,os,threading,functools,http.server,tempfile,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
site=Path(__file__).resolve().parents[1]/'docs/energi-konkurrence/v19-review'
base='https://ndigrafdatab5174313.blob.core.windows.net/graph/company-keyfigures-v1/'
class Handler(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(site)));threading.Thread(target=server.serve_forever,daemon=True).start()
origin='http://127.0.0.1:'+str(server.server_port)
with urllib.request.urlopen(base+'latest.json') as r:ptr=r.read()
pointer=json.loads(ptr)
with urllib.request.urlopen(base+'releases/'+pointer['release']+'.json') as r:body=r.read()
assert hashlib.sha256(body).hexdigest()==pointer['release']
mode='valid';requests=[]
with sync_playwright() as p:
 browser=p.chromium.launch(**({'executable_path':os.environ['CHROME_PATH']} if os.environ.get('CHROME_PATH') else {}));page=browser.new_page()
 def route(r):
  requests.append(r.request.url)
  if mode=='failed':r.fulfill(status=503,body='Unavailable',headers={'Access-Control-Allow-Origin':'*'});return
  raw=ptr if r.request.url.endswith('latest.json') else body
  if mode=='corrupt' and not r.request.url.endswith('latest.json'):raw+=b' '
  r.fulfill(status=200,body=raw,headers={'Content-Type':'application/json','Access-Control-Allow-Origin':'*'})
 page.route(base+'**',route)
 page.route(origin+'/probe',lambda r:r.fulfill(content_type='text/html',body='''<div class="cr-noegletal" data-noegletal="silicon-motion"></div><div id="aktiekurs"></div><script src="/assets/js/company-keyfigures.js"></script><script src="/assets/claude/21-noegletal.js" defer></script>'''))
 def visit():
  page.goto(origin+'/probe');page.wait_for_function('document.querySelector(".cr-noegletal").textContent.length>30&&!document.querySelector(".cr-noegletal").textContent.includes("Henter")');return page.locator('.cr-noegletal').inner_text()
 assert '1.632' in visit();assert len(requests)==2
 # Second snapshot is only a browser fixture, never uploaded to Azure.
 d=json.loads(body);d['companies']['silicon-motion']['figures']['ttm']['omsaetning']=1700
 body=json.dumps(d,ensure_ascii=False).encode();pointer['release']=hashlib.sha256(body).hexdigest();ptr=json.dumps(pointer).encode()
 assert '1.700' in visit();assert len(requests)==4
 mode='corrupt';assert 'kan ikke hentes' in visit()
 mode='failed';assert 'kan ikke hentes' in visit()
 browser.close()
server.shutdown();print('PASS: actual Azure snapshot, new release on reload without page changes, hash rejection, 503 error; no local fallback')
