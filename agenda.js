function actualizarMarcadores() {
  document.querySelectorAll(".evento").forEach(evento => {
    const hora = new Date(evento.getAttribute("data-hora")).getTime();
    const ahora = Date.now();
    const minutos = Math.floor((ahora - hora) / 60000);

    let estado = "";
    let parpadeo = false;

    if (minutos < 0) {
      estado = new Date(hora).toLocaleTimeString("es-EC", {
        hour: "2-digit", minute: "2-digit", hour12: true
      }) + " -";
    } else if (minutos < 45) {
      estado = `EN VIVO ${minutos}'`;
      parpadeo = true;
    } else if (minutos >= 45 && minutos < 60) {
      estado = "ET";
    } else if (minutos >= 60 && minutos < 120) {
      estado = `EN VIVO ${minutos}'`;
      parpadeo = true;
    } else {
      estado = "FT";
    }

    const estadoSpan = evento.querySelector(".estado");
    estadoSpan.textContent = estado;

    if (parpadeo) {
      estadoSpan.classList.add("envivo");
    } else {
      estadoSpan.classList.remove("envivo");
    }
  });
}

function iniciarActualizacion() {
  actualizarMarcadores();
  setInterval(actualizarMarcadores, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarActualizacion);
} else {
  iniciarActualizacion();
}
