const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxMJ1jKzWm3tm0IipWReacDKExzHX7kRDJZ6qFV83-qVgC1-Vx_4ktmTAcQzgLyTP8O5gGmUm2z-m9/pub?output=csv";
const normalizar = str => str.toLowerCase().replace(/\s+/g, ' ').trim();

fetch(urlCSV)
  .then(res => res.text())
  .then(csvText => {
    const adicionales1 = {};
    const adicionales2 = {};
    const lines = csvText.trim().split("\n").slice(1);
    lines.forEach(line => {
      const [nombre, ad1, ad2] = line.split(",");
      const clave = normalizar(nombre);
      adicionales1[clave] = parseInt(ad1?.trim()) || 0;
      adicionales2[clave] = parseInt(ad2?.trim()) || 0;
    });

    function actualizarMarcadores() {
      document.querySelectorAll(".evento").forEach(evento => {
        const hora = new Date(evento.getAttribute("data-hora")).getTime();
        const ahora = Date.now();
        const minutos = Math.floor((ahora - hora) / 60000);

        const nombre = evento.querySelector(".nombre").textContent.trim();
        const clave = normalizar(nombre);
        const ad1 = adicionales1[clave] ?? 0;
        const ad2 = adicionales2[clave] ?? 0;

        let estado = "";
        let parpadeo = false;

        if (minutos < 0) {
          estado = new Date(hora).toLocaleTimeString("es-EC", {
            hour: "2-digit", minute: "2-digit", hour12: true
          }) + " -";
        }

        // PRIMER TIEMPO
        else if (minutos < 45) {
          estado = `EN VIVO ${minutos}'`;
          parpadeo = true;
        } else if (minutos >= 45 && minutos <= 45 + ad1) {
          estado = `45'+${minutos - 45}`;
        } else if (minutos > 45 + ad1 && minutos < 60) {
          estado = "ET";
        } else if (minutos === 60) {
          estado = `EN VIVO 46'`;
          parpadeo = true;
        }

        // SEGUNDO TIEMPO
        else if (minutos >= 61 && minutos < 120) {
          estado = `EN VIVO ${minutos}'`;
          parpadeo = true;
        } else if (minutos >= 120 && minutos <= 120 + ad2) {
          estado = `120'+${minutos - 120}`;
        } else if (minutos > 120 + ad2) {
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
