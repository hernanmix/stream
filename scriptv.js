const canalesStream = [
  "espn", "espn2", "espn3", "ecdf", "disney", "disney1", "disney2",
  "foxsports", "foxsports2", "foxsports3", "nba", "tnt", "tyc", "directv",
  "win", "goltv", "tves", "caracol", "rcn", "teleamazonas", "telefe"
];

function abrirReproductor(canal) {
  const canalLower = canal.toLowerCase();
  const esStream = canalesStream.includes(canalLower);

  const url = esStream
    ? "https://hernanmix.github.io/stream/reproductor.html?stream=" + canalLower
    : "https://hsports4hd.blogspot.com/p/" + canalLower + ".html";

  if (esStream) {
    // Abrir en reproductor flotante
    const iframe = document.getElementById("iframeReproductor");
    iframe.src = url;
    document.getElementById("modalReproductor").style.display = "block";
  } else {
    // Abrir como página Blogger
    window.location.href = url;
  }
}

function cerrarReproductor() {
  const iframe = document.getElementById("iframeReproductor");
  iframe.src = "";
  document.getElementById("modalReproductor").style.display = "none";
}
