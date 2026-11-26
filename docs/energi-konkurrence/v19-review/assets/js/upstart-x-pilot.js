/* Christian's single-company pilot: Grok approves editorial content. */
(() => {
  'use strict';
  if (!/\/selskaber\/upstart\.html$/.test(location.pathname)) return;
  const section = document.getElementById('upstart-x-pilot');
  if (!section) return;
  const url = 'https://ndigrafdatab5174313.blob.core.windows.net/x-curated/latest.json';
  const isin = 'US91680M1071', day = 86400000;
  const list = section.querySelector('ul'), note = section.querySelector('[data-pilot-update]');
  const links = document.querySelectorAll('a[href="#upstart-x-pilot"]');
  function hide() { section.hidden = true; links.forEach(a => a.hidden = true); list.replaceChildren(); }
  function fresh(value, age, now) { const t = Date.parse(value); return Number.isFinite(t) && t <= now && now - t <= age; }
  function element(tag, text, cls) { const node = document.createElement(tag); node.textContent = text; if(cls)node.className=cls; return node; }
  let busy = false;
  async function update() {
    if(busy) return; busy = true;
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(url, {cache:'no-store', signal:controller.signal});
      if(!response.ok) throw new Error('Feed unavailable');
      const feed = await response.json(), now = Date.now(), company = feed.companies?.[isin];
      if(feed.kind !== 'ndi.x.curated' || !fresh(feed.updated_at, 3*day, now) || company?.status !== 'ok' || !fresh(company.checked_at, 3*day, now) || !Array.isArray(company.posts)) throw new Error('No current approved company feed');
      const seen = new Set();
      const posts = company.posts.filter(p => {
        const match = /^https:\/\/x\.com\/([A-Za-z0-9_]+)\/status\/(\d+)$/.exec(p.url || '');
        if(!match || match[2] !== String(p.post_id) || match[1].toLowerCase() !== String(p.author_handle).replace(/^@/,'').toLowerCase() || match[1].toLowerCase() === 'madsc007' || !fresh(p.published_at,30*day,now) || !fresh(p.checked_at,3*day,now) || typeof p.reason !== 'string' || !p.reason.trim() || seen.has(p.post_id))return false;
        seen.add(p.post_id);return true;
      }).sort((a,b)=>Date.parse(b.published_at)-Date.parse(a.published_at)).slice(0,3);
      if(!posts.length){hide();return;}
      list.replaceChildren();
      posts.forEach(p=>{
        const item=element('li','','x-tema-opslag');
        item.append(element('p','@'+p.author_handle+' · '+new Date(p.published_at).toLocaleDateString('da-DK',{timeZone:'Europe/Copenhagen'}),'x-tema-hoved'));
        item.append(element('p',p.reason));
        const a=element('a','Læs originalopslaget på X ↗','tekstlink');a.href=p.url;a.target='_blank';a.rel='noopener noreferrer';item.append(a);list.append(item);
      });
      note.textContent='Udvalgt og kontrolleret af Grokbot · seneste kontrol '+new Date(company.checked_at).toLocaleString('da-DK',{timeZone:'Europe/Copenhagen'})+'.';
      section.hidden=false; links.forEach(a=>a.hidden=false);
    } catch { hide(); }
    finally { clearTimeout(timer);busy=false; }
  }
  hide();update();
  setInterval(()=>{if(!document.hidden)update();},300000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)update();});
})();
