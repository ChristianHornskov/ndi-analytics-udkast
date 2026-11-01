/* Punkt 29: X-modulet på selskabssider.
   1) Mobilteksten lovede, at opslaget først hentes ved tryk, men x-tema.js henter
      det automatisk. Teksten rettes til det, der faktisk sker.
   2) Når der ikke er kuraterede opslag, skjuler x-tema.js hele sektionen. Står
      Mads' delte opslag i sektionen, skjules kun panelet. */
(function () {
  var GAMMEL = 'Opslaget hentes først fra X, når du trykker.';
  function retTekst(rod) {
    rod.querySelectorAll('.x-embed-vent span').forEach(function (s) {
      if (s.firstChild && s.firstChild.nodeType === 3 && s.firstChild.nodeValue.indexOf(GAMMEL) === 0) {
        s.firstChild.nodeValue = 'Opslaget hentes fra X. Virker det ikke, kan du ';
        var a = s.querySelector('a'); if (a) a.textContent = 'åbne det på X';
      }
    });
  }
  function holdSynlig(sek) {
    if (!sek.querySelector('.rm-grid-x')) return;
    if (sek.hidden) {
      sek.hidden = false;
      var panel = sek.querySelector('.x-tema'); if (panel) panel.hidden = true;
    }
  }
  function start() {
    var sek = document.getElementById('x-opslag');
    if (!sek) return;
    retTekst(sek); holdSynlig(sek);
    new MutationObserver(function () { retTekst(sek); holdSynlig(sek); })
      .observe(sek, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
