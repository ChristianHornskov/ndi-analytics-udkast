(function(){
const base=new URL('../',document.currentScript.src);
const aliases={'sea sp adr':'sea','taiyo yuden co ltd':'taiyo-yuden'};
function companyLink(a){
 const label=a.textContent.trim().toLowerCase();
 const entries=Object.entries(window.DAGENS_TAL?.selskaber||{});
 const slug=aliases[label]||entries.find(([,c])=>c.navn.toLowerCase()===label)?.[0];
 return new URL(slug?'selskaber/'+slug+'.html':'fordeling.html#selskaber',base).href;
}
function connect(){document.querySelectorAll('a[href*="/v2-test/selskab.html?"]').forEach(a=>{a.href=companyLink(a);a.removeAttribute('target');});}
new MutationObserver(connect).observe(document.body,{childList:true,subtree:true});connect();
window.addEventListener('click',e=>{
 const b=e.target.closest('#detail-toggle,[data-go="portfolio"]');
 if(!b)return;e.preventDefault();e.stopImmediatePropagation();
 location.href=new URL('fordeling.html',base).href;
},true);
})();

