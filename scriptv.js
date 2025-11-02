function abrirReproductor(canal) {
  const canalLower = canal.toLowerCase();

  // Detecta si la URL contiene "stream=" o "channel="
  const esStream = canalLower.includes("stream=") || canalLower.startsWith("espn") || canalLower.startsWith("foxsports") || canalLower.startsWith("nba") || canalLower.startsWith("tnt") || canalLower.startsWith("directv") || canalLower.startsWith("win") || canalLower.startsWith("goltv") || canalLower.startsWith("ecdf") || canalLower.startsWith("disney") || canalLower.startsWith("tyc");

  if (esStream) {
    // Abrir en reproductor flotante con stream=
    const url = canalLower.includes("stream=")
      ? "https://hernanmix.github.io/stream/reproductor.html?" + canalLower
      : "https://hernanmix.github.io/stream/reproductor.html?stream=" + canalLower;

    const iframe = document.getElementById("iframeReproductor");
    iframe.src = url;
    document.getElementById("modalReproductor").style.display = "block";
  } else {
    // Abrir como página Blogger con channel=
    const url = canalLower.includes("channel=")
      ? "https://hsports4hd.blogspot.com/p/" + canalLower.replace("channel=", "") + ".html"
      : "https://hsports4hd.blogspot.com/p/" + canalLower + ".html";

    window.location.href = url;
  }
}
