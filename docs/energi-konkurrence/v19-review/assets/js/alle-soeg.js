 
(function () {
  "use strict";
  var felt = document.getElementById("find"), tabel = document.getElementById("alle-tabel");
  if (!felt || !tabel) return;
  function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); }
  var status=document.createElement('p');status.setAttribute('role','status');status.hidden=true;felt.after(status);
  function filtrer() {
    var hits=0;
    var q = norm(felt.value);
    tabel.querySelectorAll("tbody tr").forEach(function (tr) {
      var navn = tr.querySelector("[data-f='navn']"), tema = tr.querySelector("[data-f='temaNavn']");
      var hit = !q || norm(navn && navn.textContent).indexOf(q) > -1 || norm(tema && tema.textContent).indexOf(q) > -1;
      tr.hidden = !hit;if(hit)hits++;
    });
    status.hidden=hits>0;status.textContent='Ingen selskaber matcher ”'+felt.value+'”. Prøv et andet navn eller et tema.';
  }
  felt.addEventListener("input", filtrer);
  felt.addEventListener("search", filtrer);
  if (felt.value) setTimeout(filtrer, 0);
})();
