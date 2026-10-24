import {spaceXPage,bindSpaceX} from './spacex-page.mjs';
const reused=await fetch('context.json').then(r=>r.json());let fund=0;
const app=document.querySelector('#app');
function render(){const c={reused,fund,logo:()=>'',weight:c=>fund?c.wA:c.wN,fmt:n=>n.toLocaleString('da-DK',{maximumFractionDigits:1}),date:d=>new Date(d).toLocaleDateString('da-DK',{day:'numeric',month:'short',year:'numeric'}),note:(t,b)=>`<aside class="review"><span>TIL CHRISTIAN · KOMMENTAR TIL VERSION 5</span><h2>${t}</h2>${b}</aside>`};app.innerHTML=spaceXPage(c);bindSpaceX(app);app.querySelectorAll('[data-fund]').forEach(b=>b.onclick=()=>{const y=scrollY;fund=+b.dataset.fund;render();scrollTo(0,y)});app.querySelectorAll('a[href^="#"]:not([data-sx-jump])').forEach(a=>{a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.title='Denne isolerede feedbackvisning indeholder kun selskabssiden';});}
render();
