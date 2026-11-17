/* Search the complete live list, displaying it in manageable portions. */
(()=>{'use strict';
 const input=document.getElementById('find'),table=document.getElementById('alle-tabel');if(!input||!table)return;
 const norm=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
 const size=25;let limit=size;
 const status=document.createElement('p');status.className='mobile-list-status';status.setAttribute('role','status');input.after(status);
 const more=document.createElement('button');more.type='button';more.className='knap mobile-list-more';table.closest('.tabel-rul').after(more);
 function render(){const q=norm(input.value);const rows=[...table.querySelectorAll('tbody tr')],matches=rows.filter(tr=>!q||norm(tr.querySelector('[data-f="navn"]')?.textContent).includes(q)||norm(tr.querySelector('[data-f="temaNavn"]')?.textContent).includes(q));rows.forEach(r=>r.hidden=true);matches.slice(0,limit).forEach(r=>r.hidden=false);
  status.textContent=matches.length?'Viser '+Math.min(limit,matches.length)+' af '+matches.length+' selskaber'+(q?' i søgningen':'')+'.':'Ingen selskaber matcher ”'+input.value+'”. Prøv et andet navn eller et tema.';
  more.hidden=matches.length<=limit;more.textContent='Vis '+Math.min(size,Math.max(0,matches.length-limit))+' flere selskaber';
 }
 input.addEventListener('input',()=>{limit=size;render()});input.addEventListener('search',()=>{limit=size;render()});more.addEventListener('click',()=>{limit+=size;render()});render();
})();
