(() => {
  const host=document.querySelector('#ai-rejsen');if(!host)return;
  const layers=[
    ['ai-use','Spørgsmålet','Dit spørgsmål sætter maskiner i arbejde','Når du sender en besked til en AI-tjeneste i skyen, bliver svaret beregnet på computere et andet sted. Modellen bruger det, den har lært under træningen. Den starter ikke sin træning forfra, hver gang du spørger.','software','Software & AI'],
    ['gpu-cloud','Datacentret','Her står computerne bag svaret','Et datacenter samler servere, netværk, strøm og køling. Nogle selskaber udlejer bygningen, mens andre driver computerne og sælger adgang til regnekraften. Det er forskellige forretninger med forskellige krav til kapital.','datacenter','Datacentre'],
    ['scale-up','Serverne','Flere chips deler arbejdet','En stor AI-model kan kræve flere chips. De fordeler beregningen mellem sig og udveksler delresultater. Hurtige forbindelser og tilstrækkelig hukommelse er derfor lige så nødvendige som selve regnekraften.','chips','Chips og forbindelser'],
    ['accelerator','AI-chippen','Mange små beregninger på én gang','AI-chips er indrettet til at udføre mange beregninger parallelt. Men en hurtig chip hjælper kun, hvis den også får data hurtigt nok. Derfor er hukommelse, avanceret pakning og forbindelser en vigtig del af systemet.','chips','Chips og halvledere'],
    ['foundry','Chipfabrikken','Fra tegning til fysisk elektronik','Chipdesign og chipproduktion er ikke nødvendigvis samme forretning. En specialiseret fabrik omsætter designet til elektronik gennem mange præcise procestrin. Den er afhængig af udstyr, materialer og evnen til at producere fejlfri chips i stor skala.','chips','Selskaberne bag chippen'],
    ['generation','Strømmen','Det hele kræver elektricitet','Regnekraft kræver en stabil strømforsyning. Strømmen skal både produceres og føres frem gennem elnet, transformere og anlæg på stedet. Mere efterspørgsel efter AI kan derfor skabe behov for investeringer langt uden for selve chipindustrien.','energi','Energi og elnet']
  ];
  let current=0;
  host.innerHTML='<span class="eyebrow">FRA SKÆRM TIL STRØM</span><h2>Hvad sker der, når du spørger AI?</h2><p class="review-lead">Ét spørgsmål. En hel verden af teknologi bag svaret. Vælg et led og kig indenfor.</p><div class="journey-steps" role="group" aria-label="Vælg et led i AI-kæden">'+layers.map((x,i)=>'<button type="button" data-layer="'+i+'" aria-pressed="'+(i===0)+'"><span>0'+(i+1)+'</span>'+x[1]+'</button>').join('')+'</div><div class="journey-scene"><picture><source id="journey-mobile" media="(max-width:600px)"><img id="journey-image" alt="" width="1600" height="900" loading="lazy"></picture><div class="journey-copy" aria-live="polite"><span id="journey-count" class="eyebrow"></span><h3 id="journey-title"></h3><p id="journey-text"></p><a id="journey-link" class="tekstlink"></a></div></div>';
  function render(){
    const x=layers[current],light=document.documentElement.dataset.tema==='lys',suffix=light?'-lys':'';
    const base='assets/review-zoom/zoom-'+(current+1)+'-'+x[0];
    host.querySelector('#journey-mobile').srcset=base+'-mobil-780x1040'+suffix+'.webp';
    host.querySelector('#journey-image').src=base+'-desktop-1600x900'+suffix+'.webp';
    host.querySelector('#journey-image').alt='Illustration: '+x[1];
    host.querySelector('#journey-count').textContent='0'+(current+1)+' / 06 · '+x[1];
    host.querySelector('#journey-title').textContent=x[2];
    host.querySelector('#journey-text').textContent=x[3];
    const link=host.querySelector('#journey-link');link.href='temaer/'+x[4]+'.html';link.textContent='Udforsk '+x[5].toLowerCase()+' →';
    host.querySelectorAll('[data-layer]').forEach((b,i)=>b.setAttribute('aria-pressed',String(current===i)));
  }
  host.querySelectorAll('[data-layer]').forEach((button,i)=>button.addEventListener('click',()=>{current=i;render();}));
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['data-tema']});
  render();
})();
