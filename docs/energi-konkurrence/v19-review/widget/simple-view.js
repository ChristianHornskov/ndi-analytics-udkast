/* Opt-in presentation for the Wix test page. No financial calculations here. */
(() => {
  document.documentElement.classList.add('simple-view');
  let expanded = false;
  const baseRender = render;
  const baseTab = showTab;
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(() => { if(data && activeReviewTab==='overview')drawProductionGrowth(); },100);
  });
  document.addEventListener('click', event => {
    if (event.target.closest('a[href="#global-disclaimer"]')) {
      const details = document.getElementById('important-information');
      if (details) {
        event.preventDefault();
        details.open = true;
        details.scrollIntoView({block:'start'});
      }
    }
  }, true);
  function setExpanded(value, tab = 'overview') {
    expanded = value;
    document.documentElement.classList.toggle('advanced-view', value);
    const toggle = document.getElementById('detail-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(value));
      toggle.textContent = value ? 'Tilbage til det enkle overblik ↑' : 'Vil du vide mere? Se analyser og detaljer →';
    }
    baseTab(tab);
    requestAnimationFrame(notifyHeight);
  }
  showTab = function(name) {
    if (name !== 'overview') setExpanded(true, name);
    else baseTab(name);
  };
  function enhance() {
    if (!data) return;
    if (!document.getElementById('detail-toggle')) {
      const block = document.createElement('div');
      block.className = 'detail-action';
      block.innerHTML = '<div><strong>Få mere indsigt i din investering</strong><p>Selskaber, sektorer, afkast, risiko og beregningsmetode.</p></div><button id="detail-toggle" aria-expanded="false" aria-controls="portfolio highs risk method">Vil du vide mere? Se analyser og detaljer →</button>';
      document.getElementById('overview').after(block);
      block.querySelector('button').onclick = () => {
        setExpanded(!expanded, expanded ? 'overview' : 'portfolio');
        requestAnimationFrame(() => document.querySelector(expanded ? 'nav' : '.controls').scrollIntoView({block:'start'}));
      };
    }
    if (!document.getElementById('important-information')) {
      const details = document.createElement('details');
      details.id = 'important-information';
      details.innerHTML = '<summary>Vigtig information om afkast, omkostninger og risiko</summary>';
      const disclosure = document.getElementById('global-disclaimer');
      disclosure.before(details);
      details.appendChild(disclosure);
      details.addEventListener('toggle', notifyHeight);
    }
    document.querySelector('.holdings-summary h2').textContent = 'Din investering er fordelt på';
    const positionLabel=document.querySelector('#concentration .metric:first-child .sub');
    if(positionLabel)positionLabel.textContent='værdipapirpositioner';
    document.querySelectorAll('[data-go="portfolio"]').forEach(button => {
      button.textContent = 'Se alle positionerne →';
      button.onclick = () => setExpanded(true, 'portfolio');
    });
    document.querySelectorAll('a[href="#global-disclaimer"]').forEach(link => {
      link.onclick = () => { document.getElementById('important-information').open = true; };
    });
    const nav = document.querySelector('nav');
    nav.setAttribute('aria-label', 'Fordyb dig i fonden');
    requestAnimationFrame(notifyHeight);
  }
  render = function() { baseRender(); enhance(); };
  if (data) enhance();
})();
