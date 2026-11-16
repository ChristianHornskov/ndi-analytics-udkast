/* Keep shareable Wix URLs in step with the embedded review, without polling. */
(function () {
  'use strict';
  const host = 'https://www.newdealinvest.dk';
  if (window.parent === window || window.__ndiReviewNavigation) return;
  const root = new URL('../../', document.currentScript.src);
  if (location.origin !== root.origin) return;
  window.__ndiReviewNavigation = true;
  let connected = false;
  const validPath = path => /^(?:(?:widget|portfolio)\/index|tech|index|alle-selskaber|fondens-udvikling|(?:temaer|selskaber)\/[a-z0-9]+(?:-[a-z0-9]+)*)\.html$/.test(path);
  function read(url) {
    if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname) || url.search) return null;
    const path = url.pathname.slice(root.pathname.length);
    return validPath(path) && url.hash.length <= 300 ? {path, hash:url.hash} : null;
  }
  function ready() {
    const current = read(new URL(location.href));
    if (current) parent.postMessage({type:'ndi:review-ready', route:current}, host);
  }
  window.addEventListener('message', event => {
    if (event.source !== parent || event.origin !== host || !event.data) return;
    if (event.data.type === 'ndi:review-connected') connected = true;
    if (event.data.type !== 'ndi:review-go') return;
    const target = event.data.route;
    if (!target || typeof target.path !== 'string' || !validPath(target.path) || typeof target.hash !== 'string' || (target.hash && !/^#[^\s\u0000-\u001f]*$/.test(target.hash)) || target.hash.length > 300) return;
    const url = new URL(target.path + target.hash, root);
    if (url.href === location.href) ready();
    else location.replace(url.href); // The parent owns the one browser-history entry.
  });
  document.addEventListener('click', event => {
    if (!connected || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href), target = read(url);
    if (!target || url.pathname === location.pathname) return;
    event.preventDefault();
    parent.postMessage({type:'ndi:review-navigate', route:target}, host);
  });
  window.addEventListener('pageshow', ready);
  window.addEventListener('hashchange', ready);
  ready();
})();
