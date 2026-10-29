(()=>{
 const root=document.querySelector('#cq-ft');if(!root)return;
 const select=document.querySelector('#pd-fintech-select');
 select?.addEventListener('change',()=>{
  const button=document.getElementById(select.value);if(!button)return;
  const panel=button.closest('[id^="cq-ft-p-"]');
  if(panel){const toggle=root.querySelector(`[aria-controls="${panel.id}"]`);if(toggle&&toggle.getAttribute('aria-expanded')!=='true')toggle.click();}
  button.closest('.cq-ft__cos')?.classList.add('cq-ft--open');button.click();button.focus();button.scrollIntoView({block:'center',behavior:'instant'});
 });
 const addLink=button=>{
  const scope=button.closest('.cq-ft__scope')||root;
  const info=scope.querySelector('.cq-ft__info');if(!info||!button.dataset.companyUrl)return;
  info.querySelector('[data-company-link]')?.remove();
  const link=document.createElement('a');link.dataset.companyLink='';link.href=button.dataset.companyUrl;link.textContent='Læs selskabssiden →';info.append(link);
 };
 root.querySelectorAll('.cq-ft__co').forEach(button=>{button.addEventListener('click',()=>addLink(button));button.addEventListener('focus',()=>addLink(button));button.addEventListener('mouseenter',()=>addLink(button));});
})();
