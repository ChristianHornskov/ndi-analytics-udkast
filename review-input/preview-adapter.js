/* Preview-only composition. Original homepage graph, data and styling remain intact. */
(() => {
  function highlightAccounts(){
    document.querySelectorAll('#class-choice .preview-tax').forEach(note=>{
      if(note.querySelector('.class-account-focus'))return;
      const text=note.textContent;
      const focus=text.startsWith('Typisk relevant')?'frie midler eller aktiesparekonto':'pension, VSO og selskaber';
      const at=text.indexOf(focus);
      if(at<0)return;
      const emphasis=document.createElement('b');emphasis.className='class-account-focus';emphasis.textContent=focus;
      note.replaceChildren(document.createTextNode(text.slice(0,at)),emphasis,document.createTextNode(text.slice(at+focus.length)));
    });
  }
  const classChoice=document.getElementById("class-choice");
  if(classChoice)new MutationObserver(highlightAccounts).observe(classChoice,{childList:true,subtree:true});
  function adapt() {
    if (!data || !window.REVIEW_FUNDS) return;
    const f = data.funds[selected];
    const summary = window.REVIEW_FUNDS.find(item => item.id.toLowerCase() === f.id);
    if (!summary) return;
    highlightAccounts();
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
    const years=u.kalender.slice(0,3);
    const mobileCalendar='<table class="widget-calendar-mobile"><thead><tr><th>Måned</th>'+years.map(year=>'<th>'+year.aar+'</th>').join('')+'</tr></thead><tbody>'+['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'].map((label,i)=>'<tr><th>'+label+'</th>'+years.map(year=>{const month=year.maaneder.find(m=>Number(m.maaned.slice(-2))===i+1);return '<td class="heat '+(!month?'':month.afkast>=0?'pos':'neg')+'">'+value(month?.afkast,month?.delvis)+'</td>';}).join('')+'</tr>').join('')+'<tr class="widget-calendar-year"><th>Året</th>'+years.map(year=>'<td>'+value(year.afkast,year.delvis)+'</td>').join('')+'</tr></tbody></table>';
    calendar.querySelector('.tablewrap').insertAdjacentHTML('afterend',mobileCalendar);
    let entries = document.getElementById('preview-entries');
    if (!entries) {
      entries = document.createElement('nav'); entries.id='preview-entries'; entries.className='review-entry-cards'; entries.setAttribute('aria-label','Gå på opdagelse');
      entries.innerHTML='<a class="entry-portfolio" href="../portfolio/index.html"><div class="entry-art" aria-hidden="true"><div class="entry-holdings"></div><span>AFKAST · RISIKO · SELSKABER</span></div><div class="entry-copy"><span><strong>Gå på opdagelse i porteføljen</strong><small>Få overblikket over afkast, udsving og de selskaber, fonden ejer.</small></span><span class="entry-arrow" aria-hidden="true">↗</span></div></a><a class="entry-tech" href="../tech.html"><div class="entry-art" aria-hidden="true"><img src="../assets/img/v5-fotos/chips-siliciumwafer.webp" alt=""><span>12 TEMAER · ÉN FORBUNDET VERDEN</span></div><div class="entry-copy"><span><strong>Gå på opdagelse i tech</strong><small>Fra chips og strøm til rumfart. Se teknologien og forbindelserne bag.</small></span><span class="entry-arrow" aria-hidden="true">↗</span></div></a>' ;
      calendar.after(entries);
    }
    const source=data.funds.find(f=>f.id==='pmindi')||data.funds[0];
    const top=source.positions.filter(p=>p.isin&&p.weight>0).sort((a,b)=>b.weight-a.weight).slice(0,3);
    entries.querySelector('.entry-holdings').innerHTML='<div class="entry-holdings-title">Et kig ind i fonden <span>PMINDI</span></div>'+top.map((p,i)=>'<div class="entry-holding"><span class="entry-rank">0'+(i+1)+'</span><span class="entry-company">'+esc(p.name)+'</span><b>'+n(p.weight,1)+' %</b><i style="width:'+Math.max(3,p.weight/top[0].weight*100)+'%"></i></div>').join('');
    notifyHeight();
  }
  const homepageRender = render;
  render = function() { homepageRender(); adapt(); };
  if (data) adapt();
})();
