function abrirReproductor(canal) {
  const canalLower = canal.toLowerCase();
  let url = "";

  if (canalLower.startsWith("http")) {
    url = canalLower;
  } else {
    url = "https://hernanmix.github.io/stream/reproductor.html?stream=" + canalLower;
  }

  const iframe = document.getElementById("iframeReproductor");
  iframe.src = url;
  document.getElementById("modalReproductor").style.display = "block";
}
