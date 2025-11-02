function abrirReproductor(canal) {
  const canalLower = canal.toLowerCase();
  let url = "";

  if (canalLower.startsWith("http")) {
    // URL completa → úsala tal cual
    url = canalLower;
  } else if (canalesStream.includes(canalLower)) {
    // Canal tipo stream
    url = "https://hernanmix.github.io/stream/reproductor.html?stream=" + canalLower;
  } else {
    // Canal tipo channel
    url = "https://hsports4hd.blogspot.com/2025/09/reproductor-evento.html?channel=" + canalLower;
  }

  const iframe = document.getElementById("reproductorIframe");
  iframe.src = url;
  document.getElementById("reproductorOverlay").style.display = "block";
}
