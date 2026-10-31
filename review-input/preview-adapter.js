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
      entries.innerHTML='<a href="../portfolio/index.html"><span><strong>Gå på opdagelse i porteføljen</strong><small>Se beholdninger, spredning og risiko.</small></span><span aria-hidden="true">→</span></a><a href="../tech.html"><span><strong>Gå på opdagelse i tech</strong><small>Forstå teknologien og se forbindelserne.</small></span><span aria-hidden="true">→</span></a>';
      calendar.after(entries);
    }
    notifyHeight();
  }
  const homepageRender = render;
  render = function() { homepageRender(); adapt(); };
  if (data) adapt();
})();
