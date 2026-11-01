/* Punkt 52: reservebillede, når YouTube-billedet ikke kan hentes.
   YouTube svarer med et gråt billede på 120 x 90 px, når der ikke findes et
   miniaturebillede. Det behandles som manglende. */
(function () {
  function mangler(img) {
    var boks = img.closest('.rm-play, .sx-video-start');
    if (boks) boks.classList.add('cr-uden-billede');
  }
  function tjek(img) {
    if (img.complete) {
      if (!img.naturalWidth || img.naturalWidth <= 120) mangler(img);
    } else {
      img.addEventListener('error', function () { mangler(img); }, { once: true });
      img.addEventListener('load', function () { if (img.naturalWidth <= 120) mangler(img); }, { once: true });
    }
  }
  function start() {
    document.querySelectorAll('.rm-play img, .sx-video-start img').forEach(tjek);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
