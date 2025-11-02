const canalesStream = [
  "espn", "espn2", "espn3", "ecdf", "disney", "disney1", "disney2",
  "foxsports", "foxsports2", "foxsports3", "nba", "tnt", "tyc", "directv",
  "win", "goltv", "tves", "caracol", "rcn", "teleamazonas", "telefe", "mls1es"
];

function abrirReproductor(canal) {
  const canalLower = canal.toLowerCase();
  const esStream = canalesStream.includes(canalLower);

  const url = esStream
    ? "https://hernanmix.github.io/stream/reproductor.html?stream=" + canalLower
    : "https://hsports4hd.blogspot.com/p/" + canalLower + ".html";

  const iframe = document.getElementById("reproductorIframe");
  iframe.src = url;
  document.getElementById("reproductorOverlay").style.display = "block";
}

function cerrarReproductor() {
  const iframe = document.getElementById("reproductorIframe");
  iframe.src = "";
  document.getElementById("reproductorOverlay").style.display = "none";
}

function mostrarCanales(el) {
  const canales = el.parentElement.nextElementSibling;
  canales.style.display = canales.style.display === "none" ? "block" : "none";
}

fetch("https://raw.githubusercontent.com/hernanmix/stream/main/agenda.json")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("agenda");
    contenedor.innerHTML = "";

    data.forEach(evento => {
      const hora = new Date(evento.hora);
      const ahora = new Date();
      const minutos = Math.floor((ahora - hora) / 60000);
      let estado = "";

      if (minutos < 0) {
        const horaLegible = hora.toLocaleTimeString("es-EC", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
        estado = `${horaLegible} -`;
      } else if (minutos < 45) {
        estado = `EN VIVO ${minutos}'`;
      } else if (minutos < 120) {
        estado = `EN VIVO ${minutos}'`;
      } else {
        estado = "FT";
      }

      const div = document.createElement("div");
      div.className = "evento";
      div.setAttribute("data-hora", evento.hora);

      const fila = document.createElement("div");
      fila.className = "fila";

      const estadoSpan = document.createElement("span");
      estadoSpan.className = "estado";
      estadoSpan.textContent = estado;
      if (estado.includes("EN VIVO")) estadoSpan.classList.add("envivo");

      const nombreSpan = document.createElement("span");
      nombreSpan.className = "nombre";
      nombreSpan.textContent = evento.nombre;
      nombreSpan.onclick = function() { mostrarCanales(this); };

      fila.appendChild(estadoSpan);
      fila.appendChild(nombreSpan);

      const canalesDiv = document.createElement("div");
      canalesDiv.className = "canales";
      canalesDiv.style.display = "none";
      canalesDiv.innerHTML = evento.canales.map(c => `
        <a href="#" onclick="abrirReproductor('${c}')">${c.toUpperCase()}</a>
      `).join("");

      div.appendChild(fila);
      div.appendChild(canalesDiv);
      contenedor.appendChild(div);
    });

    setInterval(() => {
      document.querySelectorAll(".evento").forEach(evento => {
        const hora = new Date(evento.getAttribute("data-hora"));
        const ahora = new Date();
        const minutos = Math.floor((ahora - hora) / 60000);
        let estado = "";

        if (minutos < 0) {
          const horaLegible = hora.toLocaleTimeString("es-EC", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          });
          estado = `${horaLegible} -`;
        } else if (minutos < 45) {
          estado = `EN VIVO ${minutos}'`;
        } else if (minutos < 120) {
          estado = `EN VIVO ${minutos}'`;
        } else {
          estado = "FT";
        }

        const estadoSpan = evento.querySelector(".estado");
        estadoSpan.textContent = estado;
        if (estado.includes("EN VIVO")) {
          estadoSpan.classList.add("envivo");
        } else {
          estadoSpan.classList.remove("envivo");
        }
      });
    }, 10000);
  });

