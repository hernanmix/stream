const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxMJ1jKzWm3tm0IipWReacDKExzHX7kRDJZ6qFV83-qVgC1-Vx_4ktmTAcQzgLyTP8O5gGmUm2z-m9/pub?output=csv";
const normalizar = str => str.toLowerCase().replace(/\s+/g, ' ').trim();

fetch(urlCSV)
  .then(res => res.text())
  .then(csvText => {
    const adicionales = {};
    const lines = csvText.trim().split("\n").slice(1);
    lines.forEach(line => {
      const [nombre, adicional] = line.split(",");
      if (nombre && adicional) {
        adicionales[normalizar(nombre)] = parseInt(adicional.trim());
      }
    });

    function actualizarMarcadores() {
      document.querySelectorAll(".evento").forEach(evento => {
        const hora = new Date(evento.getAttribute("data-hora")).getTime();
        const ahora = Date.now();
        const minutos = Math.floor((ahora - hora) / 60000);

        const nombre = evento.querySelector(".nombre").textContent.trim();
        const adicional = adicionales[normalizar(nombre)] || 0;

        let estado = "";
        let parpadeo = false;

        if (minutos < 0) {
          estado = new Date(hora).toLocaleTimeString("es-EC", {
            hour: "2-digit", minute: "2-digit", hour12: true
          }) + " -";
        } else if (minutos < 45) {
          estado = `EN VIVO ${minutos}'`;
          parpadeo = true;
        } else if (minutos >= 45 && minutos <= 45 + adicional) {
          estado = `EN VIVO 45'+${minutos - 45}`;
          parpadeo = true;
        } else if (minutos > 45 + adicional && minutos < 60) {
          estado = "ET";
        } else if (minutos === 60) {
          estado = `EN VIVO 45'`;
          parpadeo = true;
        } else if (minutos >= 120 && minutos <= 120 + adicional) {
          estado = `EN VIVO 120'+${minutos - 120}`;
          parpadeo = true;
        } else if (minutos >= 61 && minutos < 120) {
          estado = `EN VIVO ${minutos}'`;
          parpadeo = true;
        } else if (minutos > 120 + adicional) {
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
  });
