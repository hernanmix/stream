// Inyectar estilos CSS directamente desde JavaScript
const estilo = document.createElement("style");
estilo.textContent = `
  .marcador-container {
    position: relative;
    width: 100%;
    height: 32px;
    margin-top: 6px;
  }
  .barra-progreso {
    position: absolute;
    top: 22px;
    left: 0;
    height: 8px;
    background-color: #00ff00;
    width: 0%;
    transition: width 1s linear;
    border-radius: 4px;
  }
  .minuto-overlay {
    position: absolute;
    top: 0;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: red;
    padding: 4px 8px;
    border-radius: 50%;
    text-align: center;
    min-width: 32px;
    transition: left 1s linear;
    white-space: nowrap;
  }
  .hora-inicio {
    font-size: 14px;
    font-weight: bold;
    color: white;
    margin-bottom: 4px;
  }
  .estado {
    display: none !important;
  }
`;
document.head.appendChild(estilo);

// Función para convertir hora a formato 12h am/pm
function formatoHora12(horaTexto) {
  const fecha = new Date(horaTexto);
  let horas = fecha.getHours();
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const sufijo = horas >= 12 ? "pm" : "am";
  horas = horas % 12 || 12;
  return `${horas}:${minutos}${sufijo}`;
}

// Detectar y abrir canal en reproductor flotante
const canalesStream = [
  "espn", "espn2", "espn3", "ecdf", "disney1", "disney2", "disney3", "disney19"
  "foxsports", "foxsports2", "foxsports3", "nba", "tnt", "tyc", "directv",
  "win", "goltv", "tves", "caracol", "rcn", "teleamazonas", "telefe", "winplusonline1", "fox_deportes_usa", "laligahypermotion", 
  "usa_network", 
];

function abrirReproductor(canal) {
  const canalLower = canal.toLowerCase();
  let url = "";

  if (canalLower.startsWith("http")) {
    url = canalLower;
  } else if (canalesStream.includes(canalLower)) {
    url = "https://hernanmix.github.io/stream/reproductor.html?stream=" + canalLower;
  } else {
    url = "https://hsports4hd.blogspot.com/2025/09/reproductor-evento.html?channel=" + canalLower;
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

// Lógica de rayita + marcador + hora visible antes del inicio
document.addEventListener("DOMContentLoaded", function () {
  const eventos = document.querySelectorAll(".evento");

  eventos.forEach((evento, index) => {
    const horaTexto = evento.getAttribute("data-hora");
    const hora = new Date(horaTexto).getTime();
    const horaSolo = formatoHora12(horaTexto);

    const estadoSpan = evento.querySelector(".estado");
    if (estadoSpan) estadoSpan.style.display = "none";

    const marcador = document.createElement("div");
    marcador.className = "marcador-container";
    marcador.innerHTML = `
      <div class="hora-inicio" id="hora-${index}">${horaSolo}</div>
      <div class="barra-progreso" id="barra-${index}" style="display:none;"></div>
      <div class="minuto-overlay" id="minuto-${index}" style="display:none;">1'</div>
    `;
    evento.appendChild(marcador);

    const barra = document.getElementById(`barra-${index}`);
    const minuto = document.getElementById(`minuto-${index}`);
    const horaInicio = document.getElementById(`hora-${index}`);
    let ultimaPosicionET = null;

    function actualizarMinuto() {
      const ahora = Date.now();
      const minutosPasados = Math.floor((ahora - hora) / 60000);
      let porcentaje = 0;
      let texto = "";

      if (minutosPasados < 0) {
        barra.style.display = "none";
        minuto.style.display = "none";
        horaInicio.style.display = "block";
        return;
      }

      horaInicio.style.display = "none";
      barra.style.display = "block";
      minuto.style.display = "block";

      if (minutosPasados <= 45) {
        porcentaje = (minutosPasados / 120) * 100;
        texto = minutosPasados + "'";
      } else if (minutosPasados <= 60) {
        porcentaje = (45 / 120) * 100;
        texto = "ET";
        if (ultimaPosicionET === null) {
          ultimaPosicionET = porcentaje;
        }
      } else if (minutosPasados <= 120) {
        const segundoTiempo = minutosPasados - 15;
        porcentaje = (segundoTiempo / 120) * 100;
        texto = segundoTiempo + "'";
      } else {
        porcentaje = 100;
        texto = "FT";
      }

      barra.style.width = porcentaje + "%";
      minuto.textContent = texto;

      if (texto === "ET" && ultimaPosicionET !== null) {
        minuto.style.left = `calc(${ultimaPosicionET}% - 16px)`;
      } else {
        minuto.style.left = `calc(${porcentaje}% - 16px)`;
      }
    }

    actualizarMinuto();
    setInterval(actualizarMinuto, 1000);
  });
});
