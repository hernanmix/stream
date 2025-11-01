// Estilos flotantes pantalla completa
const estiloPantallaCompleta = document.createElement("style");
estiloPantallaCompleta.textContent = `
#modalReproductor {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 9999;
}
#modalReproductor iframe {
  width: 100%;
  height: 100%;
  border: none;
}
#modalReproductor button {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 18px;
  background: #0b90c5;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  z-index: 10000;
  cursor: pointer;
}
.estado.envivo {
  color: red;
  font-weight: bold;
  animation: parpadeo 1s infinite;
}
@keyframes parpadeo {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}
`;
document.head.appendChild(estiloPantallaCompleta);

// Crear reproductor si no existe
if (!document.getElementById("modalReproductor")) {
  const modal = document.createElement("div");
  modal.id = "modalReproductor";
  modal.innerHTML = `
    <iframe id="iframeReproductor" allowfullscreen allow="autoplay; encrypted-media"></iframe>
    <button onclick="cerrarReproductor()">🏠 INICIO</button>
  `;
  document.body.appendChild(modal);
}

const canalesStream = [
  "espn", "espn2", "espn3", "ecdf", "disney", "disney1", "disney2",
  "foxsports", "foxsports2", "foxsports3", "nba", "tnt", "tyc", "directv",
  "win", "goltv", "tves", "caracol", "rcn", "teleamazonas", "telefe"
];

function abrirReproductor(canal) {
  const canalLower = canal.toLowerCase();
  const url = canalesStream.includes(canalLower)
    ? "https://hernanmix.github.io/stream/reproductor.html?stream=" + canalLower
    : "https://hsports4hd.blogspot.com/p/" + canalLower + ".html";

  const iframe = document.getElementById("iframeReproductor");
  iframe.src = url;
  document.getElementById("modalReproductor").style.display = "block";
}

function cerrarReproductor() {
  const iframe = document.getElementById("iframeReproductor");
  iframe.src = "";
  document.getElementById("modalReproductor").style.display = "none";
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
      const inicio = new Date(evento.hora);
      const ahora = new Date();
      const minutos = Math.floor((ahora - inicio) / 60000);
      let estado = "";

      if (minutos >= 0 && minutos < 45) estado = `EN VIVO ${minutos}'`;
      else if (minutos >= 45 && minutos < 120) estado = `EN VIVO ${minutos}'`;
      else if (minutos >= 120) estado = "FT";
      else {
        const horaLegible = inicio.toLocaleTimeString("es-EC", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
        estado = `${horaLegible} -`;
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

        if (minutos >= 0 && minutos < 45) estado = `EN VIVO ${minutos}'`;
        else if (minutos >= 45 && minutos < 120) estado = `EN VIVO ${minutos}'`;
        else if (minutos >= 120) estado = "FT";
        else {
          const horaLegible = hora.toLocaleTimeString("es-EC", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          });
          estado = `${horaLegible} -`;
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
