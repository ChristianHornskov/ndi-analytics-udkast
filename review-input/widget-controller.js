  var selected=0;
  function renderFund(){
    var fund=window.REVIEW_FUNDS[selected];
    U=fund.u;F=fund;NAVN=fund.id;
    if(!P().tilgaengelig)per='all';
    var cards='<div class="review-fund-cards" aria-label="Vælg andelsklasse">'+window.REVIEW_FUNDS.map(function(f,i){return '<div class="review-fund-card"><button class="review-fund-select" data-fund="'+i+'" aria-pressed="'+(i===selected)+'"><strong>'+(i===selected?'✓ ':'')+f.id+(i===0?' – udbyttebetalende':' – akkumulerende')+'</strong><span>'+(i===0?'Udbytte udbetales til dig.':'Afkastet bliver i fonden.')+'</span><small>'+(i===0?'Typisk relevant for private med frie midler eller aktiesparekonto. Kan også bruges til pension, børneopsparing og selskaber. Ikke til VSO.':'Relevant til pension, VSO og selskaber, hvis du ønsker afkastet geninvesteret i fonden. Kan også bruges til børneopsparing og frie midler. Ikke til aktiesparekonto.')+'</small></button><button class="review-copy" data-copy="'+f.isin+'" aria-label="Kopiér ISIN for '+f.id+'">'+f.isin+' · Kopiér ISIN</button></div>';}).join('')+'</div><p id="copy-status" role="status"></p>';
    app.innerHTML=cards+skelet();
    var heading=app.querySelector('h1'), eyebrow=app.querySelector('.eyebrow');
    if(heading)app.insertBefore(heading,app.firstChild);
    if(eyebrow)app.insertBefore(eyebrow,app.firstChild);
    app.querySelectorAll('[data-fund]').forEach(function(b){b.addEventListener('click',function(){selected=Number(b.dataset.fund);renderFund();app.querySelector('[data-fund="'+selected+'"]').focus();});});
    app.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',async function(){try{await navigator.clipboard.writeText(b.dataset.copy);app.querySelector('#copy-status').textContent='ISIN kopieret: '+b.dataset.copy;}catch(e){app.querySelector('#copy-status').textContent='Kopiér ISIN manuelt: '+b.dataset.copy;}});});
    app.querySelectorAll('[data-period]').forEach(function(b){b.addEventListener('click',function(){per=b.dataset.period;opdater();});});
    var calendar=app.querySelector('#return-calendar');
    if(calendar){var section=document.createElement('section');section.id='return-calendar';section.innerHTML=calendar.querySelector('.calendar-block').outerHTML;calendar.replaceWith(section);}
    bindChart();vigtig();
  }
  if(app&&window.REVIEW_FUNDS)renderFund();
})();
