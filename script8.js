function abrirReproductor(canal) {
  const canalLower = canal.toLowerCase();
  let url = "";

  if (canalLower.startsWith("http")) {
    url = canalLower;
  } else {
    // Todos los canales tipo stream se abren en tu reproductor GitHub
    url = "https://hernanmix.github.io/stream/reproductor.html?stream=" + canalLower;
  }

  const iframe = document.getElementById("reproductorIframe");
  iframe.src = url;
  document.getElementById("reproductorOverlay").style.display = "block";
}

