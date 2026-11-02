/* Editorial group membership, current weights from the common Azure session. */
(function(){
 'use strict';
 const session=window.NDI_LIVE;
 if(session){const f=session.files['data.json'].funds.find(f=>f.id==='pmindi');const date=s=>s.split('-').reverse().join('.');document.querySelectorAll('.up-data-date').forEach(e=>e.textContent='Afkast til '+date(f.performanceAsOf)+' · Beholdning pr. '+date(session.files['data.json'].positionsAsOf));}
 const d=window.NDI_TAL||window.DAGENS_TAL;if(!d)return;
 const pct=n=>n.toLocaleString('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2})+' %';
 const put=(root,sel,text)=>root.querySelectorAll(sel).forEach(e=>e.textContent=text);
 const weight=slug=>d.selskaber[slug]?.andel||0;
 const theme=location.pathname.split('/').pop().replace('.html','');
 const current=d.temaer.find(t=>t.id===theme);
 const history=document.getElementById('andel-historie');
 if(history&&!(d.spacex?.historik?.length>1)){
  history.querySelectorAll('#graf-andel,.tabel-fold,.kildelinje').forEach(e=>e.hidden=true);
  put(history,'#historik p','Den aktuelle andel vises ovenfor. Historiske beholdningsdata er endnu ikke tilgængelige i det fælles datagrundlag.');
 }
 for(const prefix of ['ft','kr','fa','su']){
  const groups=[];
  document.querySelectorAll('.cq-'+prefix+'__co[data-slug]').forEach(b=>{
   const c=d.selskaber[b.dataset.slug],w=b.querySelector('.cq-'+prefix+'__cw');
   if(w){w.textContent=c&&c.andel!=null?pct(c.andel):'Ikke i den aktuelle beholdning';w.hidden=prefix==='ft'&&c?.tema!==theme;}
  });
  document.querySelectorAll('.cq-'+prefix+'__dx[aria-controls^="cq-'+prefix+'-p-"]').forEach(b=>{
   const p=document.getElementById(b.getAttribute('aria-controls'));if(!p)return;
   const slugs=[...new Set([...p.querySelectorAll('.cq-'+prefix+'__co[data-slug], [data-tal^="selskaber."]')].map(e=>e.dataset.slug||e.dataset.tal.split('.')[1]))].filter(k=>weight(k)>0&&d.selskaber[k].tema===theme);
   const total=slugs.reduce((s,k)=>s+weight(k),0);groups.push({b,total});
   put(b,'.cq-ft__gw,.fa-tm__gp,.cq-kr__rs b,.cq-su__sc b',pct(total));
   put(b,'.cq-ft__gs,.fa-tm__ga,.cq-su__sc span',slugs.length+' selskaber');
   put(b,'.cq-ft__sr',pct(total)+' af fonden, '+slugs.length+' selskaber');
   put(b,'.cq-kr__rs span','af fonden, '+slugs.length+' selskaber');
  });
  const max=Math.max(0,...groups.map(g=>g.total));
  groups.forEach(({b,total})=>{const bar=b.querySelector('.cq-ft__bt i');if(bar)bar.style.width=(max?total/max*100:0)+'%';const circle=b.querySelector('.cq-kr__dc circle');if(circle)circle.setAttribute('r',max?30*Math.sqrt(total/max):0);const sheet=b.querySelector('.cq-su__sheet');if(sheet)sheet.style.setProperty('--h',max?total/max:0)});
 }
 if(current){
  document.querySelectorAll('.up-fintech > div > a').forEach((a,i)=>{const c=current.selskaber[i];a.hidden=!c;if(c){a.href='../selskaber/'+c.slug+'.html';put(a,'span',c.navn);put(a,'strong',pct(c.andel))}});
  put(document,'.cq-ft__sum .cq-ft__gw',pct(current.andel));put(document,'.cq-ft__sum .cq-ft__gs',current.antal+' selskaber');
  const lead=document.querySelector('.cq-kr__lead');if(lead)lead.textContent='I midten står bogen. Omkring den står fire roller. Tallet ved hver rolle er dens andel af fonden, i alt '+pct(current.andel)+'. Tryk på en rolle for at se, hvad selskaberne gør, og hvem de er.';
 }
 const strip=document.querySelector('.s12--ny');
 if(strip){
  const groups={};const names=Object.fromEntries(Object.entries(d.selskaber).map(([k,c])=>[c.navn.toLowerCase(),k]));
  strip.querySelectorAll(':scope > span[title]').forEach(e=>{
   const name=e.title.split(',')[0],slug=names[name.toLowerCase()],w=weight(slug);e.style.flex=w+' 1 0';e.hidden=!w;e.title=name+', '+pct(w);put(e,'small',pct(w));
   const group=[...e.classList].find(c=>/^g\d$/.test(c));groups[group]=(groups[group]||0)+w;
  });
  document.querySelectorAll('.s12-lg li').forEach(e=>{const group=[...e.querySelector('i').classList].find(c=>/^g\d$/.test(c));put(e,'b',pct(groups[group]||0))});
  const list=strip.nextElementSibling;if(list?.classList.contains('claude-sr'))list.querySelectorAll('li').forEach(e=>{const name=e.textContent.split(':')[0];e.textContent=name+': '+pct(weight(names[name.toLowerCase()]))});
  if(current)put(document,'.s12-tx','Temaet fylder '+pct(current.andel)+' af fonden fordelt på '+current.antal+' selskaber. Feltets bredde svarer til selskabets andel.');
  document.querySelectorAll('p').forEach(e=>{if(/^Hims.*største.*%/.test(e.textContent)&&!e.children.length)e.textContent=current?.stoerste?current.stoerste.navn+' er temaets største position med '+pct(current.stoerste.andel)+' af fonden.':''});
 }
 if(theme==='platforme'&&current){
  document.querySelectorAll('.eks').forEach(e=>{if(e.textContent.includes('SoftBank Group er temaets største')){const top=current.selskaber.slice(0,5);e.textContent=top.length?top[0].navn+' er temaets største position med '+pct(top[0].andel)+' af fonden. De fem største positioner i temaet er '+top.map(c=>c.navn).join(', ')+'. De fylder tilsammen '+pct(top.reduce((n,c)=>n+c.andel,0))+' af fonden pr. '+d.andelsdatoTekst+'.':''}});
 }
})();
