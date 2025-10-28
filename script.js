document.addEventListener("DOMContentLoaded", function () {
  const eventos = document.querySelectorAll(".evento");

  eventos.forEach((evento, index) => {
    const horaTexto = evento.getAttribute("data-hora");
    const hora = new Date(horaTexto).getTime();

    const estadoSpan = evento.querySelector(".estado");
    if (estadoSpan) estadoSpan.style.display = "none";

    const marcador = document.createElement("div");
    marcador.className = "marcador-container";
    marcador.innerHTML = `
      <div class="barra-progreso" id="barra-${index}" style="display:none;"></div>
      <div class="minuto-overlay" id="minuto-${index}" style="display:none;">1'</div>
      <div class="hora-inicio" id="hora-${index}" style="font-weight:bold; font-size:14px;">${horaTexto.slice(11, 16)}</div>
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
        // Antes del inicio: mostrar hora, ocultar marcador
        barra.style.display = "none";
        minuto.style.display = "none";
        horaInicio.style.display = "block";
        return;
      }

      // Evento iniciado: ocultar hora, mostrar marcador
      barra.style.display = "block";
      minuto.style.display = "block";
      horaInicio.style.display = "none";

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
