/* Periods are tied to the article. A new report never silently replaces them. */
(function(){
  'use strict';
  function rows(company, periods){
    if(company?.kind!=='consolidated_revenue'||company.currency!=='USD'||company.unit!=='million'||company.segments?.join(',')!=='total')throw Error('Invalid report');
    return periods.map(id=>{
      const found=company.periods.filter(p=>p.id===id);
      if(found.length!==1)throw Error('Missing period');
      const p=found[0],url=new URL(p.source_url);
      if(p.length_months!==3||p.source_section!=='Consolidated revenue'||p.revenue?.length!==1||!Number.isFinite(p.revenue[0])||p.revenue[0]<0||url.protocol!=='https:'||url.hostname!=='www.sec.gov')throw Error('Invalid revenue');
      return {id,value:p.revenue[0],url:url.href};
    });
  }
  if(typeof module!=='undefined')module.exports={rows};
  if(typeof document==='undefined')return;
  const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e};
  window.NDI_LIVE_READY.then(s=>{
    document.querySelectorAll('[data-revenue-isin]').forEach(host=>{
      try{
        const company=s.fundamentals?.companies?.[host.dataset.revenueIsin];
        const data=rows(company,host.dataset.revenuePeriods.split(','));
        const maximum=Math.max(...data.map(r=>r.value),1),fragment=document.createDocumentFragment();
        fragment.append(el('h4','Omsætning · mio. USD'));
        data.forEach(r=>{
          const box=el('div'),p=el('p',r.id.replace(/(\d+)-Q(\d)/,'Q$2 $1')+' ');
          // A-F01: den præcise værdi gemmes separat fra den afrundede visningstekst.
          const strong=el('strong',r.value.toLocaleString('da-DK',{maximumFractionDigits:12}));strong.dataset.value=String(r.value);p.append(strong);
          const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'),bar=document.createElementNS(svg.namespaceURI,'rect');
          svg.setAttribute('viewBox','0 0 600 18');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
          for(const [k,v] of Object.entries({width:600*r.value/maximum,height:18,rx:3,fill:'var(--accent)'}))bar.setAttribute(k,String(v));
          svg.append(bar);box.append(p,svg);fragment.append(box);
        });
        const a=el('a','Læs selskabets regnskab ↗');a.href=data[0].url;fragment.append(a);
        const latest=company.periods.map(p=>p.id).filter(id=>/^\d{4}-Q[1-4]$/.test(id)).sort().pop();
        const shown=data.map(p=>p.id).sort().pop();
        if(latest>shown){
          const note=el('p','Der findes også regnskabstal for '+latest.replace(/(\d+)-Q(\d)/,'Q$2 $1')+'. Sammenligningen her viser fortsat de daterede perioder ovenfor.');
          note.className='c20-note';note.dataset.newerReport=latest;fragment.append(note);
        }
        host.replaceChildren(fragment);
      }catch{host.replaceChildren(el('p','Regnskabstallene kan ikke vises lige nu. De oprindelige rapporter findes nedenfor.'));}
    });
  }).catch(()=>{});
})();
