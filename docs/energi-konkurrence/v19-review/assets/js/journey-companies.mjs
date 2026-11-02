import {JOURNEY_ROLES} from './journey-roles.mjs?v=20261102-carousel';
import {COMPANY_ROLES} from './zoom-camera.mjs?v=20261102-company';

// Technical roles are editorial; current ownership and ranking come from the page's data layer.
const roles={...COMPANY_ROLES,'ai-use':{
  ...COMPANY_ROLES['ai-use'],
  US84615Q1031:'Grok er selskabets AI-assistent, som man kan stille spørgsmål til.',
  US5949181045:'Copilot giver brugere adgang til AI i Microsofts software.',
  US30303M1027:'Meta AI gør AI-assistenter tilgængelige i selskabets tjenester.'
}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function companiesForLayer(layer,positions,companies){
  const grouped=new Map();
  for(const p of positions||[]){
    const role=roles[layer]?.[p.isin]||JOURNEY_ROLES[layer]?.[p.slug];
    if(!role||!p.slug||!Number.isFinite(p.andel)||p.andel<=0)continue;
    const old=grouped.get(p.slug);
    grouped.set(p.slug,{...p,description:role,andel:p.andel+(old?.andel||0)});
  }
  return [...grouped.values()].filter(p=>companies?.[p.slug]&&!companies[p.slug].tidligere)
    .sort((a,b)=>b.andel-a.andel||a.slug.localeCompare(b.slug));
}
export const largestCompany=(...args)=>companiesForLayer(...args)[0]||null;
export function bindJourneyCompanies(host){
  const selected=new Map();
  function update(){
    const p=window.NDI_DATALAG?.ndi('portefolje'),d=window.NDI_TAL;
    for(const card of host.querySelectorAll('.zc-card')){
      const layer=card.dataset.companyLayer;
      const list=companiesForLayer(layer,p?.beholdning?.positioner,d?.selskaber);
      const index=Math.max(0,list.findIndex(c=>c.slug===selected.get(layer)));
      const chosen=list[index];
      const stamp=JSON.stringify([list,index,p?.andelsdato]);
      if(card.dataset.companyStamp===stamp)continue;
      card.dataset.companyStamp=stamp;
      card.querySelector('.journey-company')?.remove();
      const aside=document.createElement('aside');aside.className='phase-example journey-company';
      if(!chosen){
        aside.textContent=p&&d?'Der er endnu ikke et selskabseksempel med en aktuel position på dette trin.':'Selskabseksemplet afventer fondens beholdningsdata.';
      }else{
        const c=chosen,logo=d.selskaber[c.slug]?.logo||d.alleSelskaber?.liste?.find(x=>x.slug===c.slug)?.logo;
        const url='selskaber/'+encodeURIComponent(c.slug)+'.html';
        aside.innerHTML=`<div class="journey-company-top"><span class="eyebrow">SE DET I ET SELSKAB</span>${list.length>1?`<nav class="journey-company-controls" aria-label="Selskaber på dette trin"><button type="button" data-company-step="-1" aria-label="Forrige selskab">←</button><span aria-live="polite" aria-atomic="true">${index+1} / ${list.length}</span><button type="button" data-company-step="1" aria-label="Næste selskab">→</button></nav>`:''}</div><a class="phase-company" href="${url}"><span class="phase-logo">${logo?`<img src="${esc(logo)}" alt="" width="64" height="64" loading="lazy">`:esc(c.navn.slice(0,1))}</span><span class="phase-identity"><strong>${esc(c.navn)}</strong><small>${c.andel.toLocaleString('da-DK',{minimumFractionDigits:2,maximumFractionDigits:2})} % af ${esc(d.fond?.id||'fonden')}</small></span><span class="phase-company-arrow" aria-hidden="true">↗</span></a><p>${esc(c.description)}</p><a class="tekstlink" href="${url}">Udforsk ${esc(c.navn)} →</a><small class="journey-company-basis">Sorteret efter andel af fonden, ikke selskabernes størrelse. Beholdning pr. ${esc(d.andelsdatoTekst||p.andelsdato)}.</small>`;
      }
      card.append(aside);
    }
  }
  host.addEventListener('click',event=>{
    const button=event.target.closest('[data-company-step]');
    if(!button)return;
    const layer=button.closest('.zc-card').dataset.companyLayer;
    const list=companiesForLayer(layer,window.NDI_DATALAG?.ndi('portefolje')?.beholdning?.positioner,window.NDI_TAL?.selskaber);
    if(list.length<2)return;
    const index=Math.max(0,list.findIndex(c=>c.slug===selected.get(layer)));
    selected.set(layer,list[(index+Number(button.dataset.companyStep)+list.length)%list.length].slug);
    const card=button.closest('.zc-card'),step=button.dataset.companyStep;
    update();
    card.querySelector(`[data-company-step="${step}"]`)?.focus({preventScroll:true});
  });
  update();
  new MutationObserver(update).observe(host,{childList:true,subtree:true});
  document.addEventListener('ndi:tal',update);
}
