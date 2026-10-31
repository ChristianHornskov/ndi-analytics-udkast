/* Preview-only composition. Original homepage graph, data and styling remain intact. */
(() => {
  function adapt() {
    if (!data || !window.REVIEW_FUNDS) return;
    const f = data.funds[selected];
    const summary = window.REVIEW_FUNDS.find(item => item.id.toLowerCase() === f.id);
    if (!summary) return;
    const u = summary.u;
    const all = u.perioder.find(p => p.id === 'all');
    document.getElementById('headline').innerHTML =
      metric('Totalafkast siden start', pct(all.afkast), f.inception + ' – ' + f.performanceAsOf) +
      metric('Gennemsnitligt årligt afkast', u.aarligtSidenStart == null ? '—' : pct(u.aarligtSidenStart), u.aarligtSidenStart == null ? 'Kræver mindst ét års historik' : 'Siden start · efter løbende omkostninger') +
      metric('100.000 kr. ved start', n(all.vaerdi100000, 0) + ' kr.', 'Med geninvesteret udbytte · før skat');
    let copies = document.getElementById('preview-copy-isins');
    if (!copies) {
      copies = document.createElement('div'); copies.id = 'preview-copy-isins';
      copies.innerHTML = window.REVIEW_FUNDS.map(item => '<button type="button" data-copy="'+item.isin+'">'+item.id+' · '+item.isin+' <span>Kopiér ISIN</span></button>').join('') + '<span id="copy-status" role="status"></span>';
      document.getElementById('class-choice').after(copies);
      copies.querySelectorAll('button').forEach(button => button.onclick = async () => {
        try { await navigator.clipboard.writeText(button.dataset.copy); document.getElementById('copy-status').textContent = 'ISIN kopieret: '+button.dataset.copy; }
        catch (_) { document.getElementById('copy-status').textContent = 'ISIN: '+button.dataset.copy; }
      });
    }
    let calendar = document.getElementById('preview-calendar');
    if (!calendar) {
      calendar = document.createElement('section'); calendar.id = 'preview-calendar'; calendar.setAttribute('aria-label','Afkastkalender');
      document.getElementById('growth').closest('article').after(calendar);
    }
    const value = (v, partial) => v == null ? '—' : n(v,1)+' %'+(partial?' *':'');
    calendar.innerHTML = '<div class="tablewrap" tabindex="0" role="region" aria-label="Månedlige afkast; rul vandret på små skærme"><table><thead><tr><th>År</th><th>Årsafkast</th>'+['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'].map(m=>'<th>'+m+'</th>').join('')+'</tr></thead><tbody>'+u.kalender.slice(0,3).map(year=>'<tr><th>'+year.aar+'</th><td class="annual">'+value(year.afkast,year.delvis)+'</td>'+Array.from({length:12},(_,i)=>{const month=year.maaneder.find(m=>Number(m.maaned.slice(-2))===i+1);return '<td class="heat '+(!month?'':month.afkast>=0?'pos':'neg')+'">'+value(month?.afkast,month?.delvis)+'</td>';}).join('')+'</tr>').join('')+'</tbody></table></div><p class="small muted">Totalafkast i DKK. * Igangværende måned eller år. Årsafkast medregner renters rente.</p>';
    let entries = document.getElementById('preview-entries');
    if (!entries) {
      entries = document.createElement('nav'); entries.id='preview-entries'; entries.className='review-entry-cards'; entries.setAttribute('aria-label','Gå på opdagelse');
      entries.innerHTML='<a class="entry-portfolio" href="../portfolio/index.html"><div class="entry-art" aria-hidden="true"><svg viewBox="0 0 520 190"><defs><linearGradient id="entry-glow"><stop stop-color="#8ac7cb"/><stop offset="1" stop-color="#f2e6a0"/></linearGradient></defs><circle cx="385" cy="95" r="66" fill="none" stroke="#90bac226" stroke-width="24"/><g class="entry-sectors"></g><path d="M22 151H264M22 111H264M22 71H264" stroke="#a4ced515"/><path class="entry-spark" d="" fill="none" stroke="url(#entry-glow)" stroke-width="4"/><circle class="entry-end" cx="264" cy="25" r="5" fill="#ece5a3"/><text x="385" y="103" text-anchor="middle" fill="#d7e9e9" font-size="19">PMINDI</text></svg><span>AFKAST · RISIKO · SELSKABER</span></div><div class="entry-copy"><span><strong>Gå på opdagelse i porteføljen</strong><small>Få overblikket over afkast, udsving og de selskaber, fonden ejer.</small></span><span class="entry-arrow" aria-hidden="true">↗</span></div></a><a class="entry-tech" href="../tech.html"><div class="entry-art" aria-hidden="true"><img src="../assets/img/v5-fotos/chips-siliciumwafer.webp" alt=""><span>12 TEMAER · ÉN FORBUNDET VERDEN</span></div><div class="entry-copy"><span><strong>Gå på opdagelse i tech</strong><small>Fra chips og strøm til rumfart. Se teknologien og forbindelserne bag.</small></span><span class="entry-arrow" aria-hidden="true">↗</span></div></a>' ;
      calendar.after(entries);
    }
    const source=data.funds.find(f=>f.id==='pmindi')||data.funds[0],points=source.data.filter(p=>Number.isFinite(p.total));
    const lo=Math.min(...points.map(p=>p.total)),hi=Math.max(...points.map(p=>p.total));
    const y=v=>151-(v-lo)/(hi-lo||1)*126;
    entries.querySelector('.entry-spark').setAttribute('d',points.map((p,i)=>(i?'L':'M')+(22+i/(points.length-1)*242).toFixed(1)+' '+y(p.total).toFixed(1)).join(''));
    entries.querySelector('.entry-end').setAttribute('cy',y(points.at(-1).total));
    const sectors=sumBy(source.positions.filter(p=>p.isin&&p.weight>0),p=>p.sector||'Ukendt'),total=sectors.reduce((a,p)=>a+p[1],0);let offset=0;
    entries.querySelector('.entry-sectors').innerHTML=sectors.map(([,v],i)=>{const length=v/total*414.69;const circle='<circle cx="385" cy="95" r="66" fill="none" stroke="'+palette[i%palette.length]+'" stroke-width="24" stroke-dasharray="'+Math.max(0,length-2)+' 414.69" stroke-dashoffset="'+(-offset)+'" transform="rotate(-90 385 95)"/>';offset+=length;return circle;}).join('');
    notifyHeight();
  }
  const homepageRender = render;
  render = function() { homepageRender(); adapt(); };
  if (data) adapt();
})();
