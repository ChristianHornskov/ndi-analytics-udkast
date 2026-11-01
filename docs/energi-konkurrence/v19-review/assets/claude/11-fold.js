// Punkt 11: antal i parentes bliver til et lille mærke i den fælles fold-komponent.
// Rører kun summary-tekster uden indlejrede datafelter, så datalaget ikke mister sine pladser.
(function () {
  document.querySelectorAll(':is(details.fold-ud, details.rm-more, details.kilder, details.kilder-d, details.fold, details.flere) > summary').forEach(function (s) {
    if (s.querySelector('[data-tal], [data-hvis], .fold-tal')) return;
    var t = s.textContent.replace(/\s+/g, ' ').trim();
    var m = /^(.*?)\s*\((\d+)\)$/.exec(t);
    if (!m) return;
    s.textContent = '';
    var a = document.createElement('span'); a.textContent = m[1];
    var b = document.createElement('span'); b.className = 'fold-tal'; b.textContent = m[2];
    s.appendChild(a); s.appendChild(b);
  });
})();
