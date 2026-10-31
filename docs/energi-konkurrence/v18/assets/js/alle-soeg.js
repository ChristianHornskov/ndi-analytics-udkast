 
(function () {
  "use strict";
  var felt = document.getElementById("find"), tabel = document.getElementById("alle-tabel");
  if (!felt || !tabel) return;
  function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); }
  function filtrer() {
    var q = norm(felt.value);
    tabel.querySelectorAll("tbody tr").forEach(function (tr) {
      var navn = tr.querySelector("[data-f='navn']"), tema = tr.querySelector("[data-f='temaNavn']");
      var hit = !q || norm(navn && navn.textContent).indexOf(q) > -1 || norm(tema && tema.textContent).indexOf(q) > -1;
      tr.hidden = !hit;
    });
  }
  felt.addEventListener("input", filtrer);
  felt.addEventListener("search", filtrer);
  if (felt.value) setTimeout(filtrer, 0);
})();
