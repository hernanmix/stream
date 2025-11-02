const canalesStream = [
  "espn", "espn2", "espn3", "ecdf", "disney", "disney1", "disney2",
  "foxsports", "foxsports2", "foxsports3", "nba", "tnt", "tyc", "directv",
  "win", "goltv", "tves", "caracol", "rcn", "teleamazonas", "telefe"
];

function abrirReproductor(canal) {
  const canalLower = canal.toLowerCase();
  let url = "";

  // Si es URL completa, úsala directamente
  if (canalLower.startsWith("http")) {
    url = canalLower;
  } else {
    // Si es canal tipo stream
    if (canalesStream.includes(canalLower)) {
      url = "https://hernanmix.github.io/stream/reproductor.html?stream=" + canalLower;
    } else {
      // Canal tipo play desde Blogger
      url = "https://hsports4hd.blogspot.com/2025/09/reproductor-evento.html?play=" + canalLower;
    }
  }

  const iframe = document.getElementById("reproductorIframe");
  iframe.src = url;
  document.getElementById("reproductorOverlay").style.display = "block";
}

function cerrarReproductor() {
  const iframe = document.getElementById("reproductorIframe");
  iframe.src = "";
  document.getElementById("reproductorOverlay").style.display = "none";
}
