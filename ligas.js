// Diccionario de clases por liga
const clasesLiga = {
  "Brasileirão": "BRA",
  "Liga BetPlay": "COL",
  "Serie A Ecuador": "ECUA",
  "Serie B Ecuador": "ECUA",
  "Primera División Costa Rica": "CR",
  "CONCACAF Central American Cup": "CENTRALAMERICANCUP",
  "CONCACAF Champions Cup": "CONCACAFCHA",
  "Copa Libertadores": "LIB",
  "Copa Sudamericana": "SUD",
  "Premier League": "ENG",
  "LaLiga": "ES",
  "Serie A": "IT",
  "Bundesliga": "ALE",
  "Ligue 1": "FRA",
  "Champions League": "CHA",
  "Europa League": "UE",
  "NBA": "NBA",
  "FIFA World Cup": "FIFA",
  "Copa América": "AMERICA",
  "MLS": "MLS"
  // Puedes seguir ampliando este diccionario si lo deseas
};

// Inyectar tu CSS completo con escudos
(function injectCSS() {
  const style = document.createElement("style");
  style.innerHTML = `
/* Tus clases CSS completas (fragmento representativo) */
.BRA .estado::after { background-image: url(https://img.futebol12.nexus/zas/br.png); }
.COL .estado::after { background-image: url(https://img.futebol12.nexus/zas/co.png); }
.ECUA .estado::after { background-image: url(https://img.futebol12.nexus/zas/ec.png); }
.CR .estado::after { background-image: url(https://img.futebol12.nexus/zas/cr.png); }
.CENTRALAMERICANCUP .estado::after { background-image: url(https://img.futebol12.nexus/zas/centralamericancup.png?new); }
.CONCACAFCHA .estado::after { background-image: url(https://img.futebol12.nexus/zas/concacafcham.png); }
.LIB .estado::after { background-image: url(https://img.futebol12.nexus/zas/libertadores.png); }
.SUD .estado::after { background-image: url(https://img.futebol12.nexus/zas/sud.png); }
.ENG .estado::after { background-image: url(https://img.futebol12.nexus/zas/en.png); }
.ES .estado::after { background-image: url(https://img.futebol12.nexus/zas/es.png); }
.IT .estado::after { background-image: url(https://img.futebol12.nexus/zas/it.png); }
.ALE .estado::after { background-image: url(https://img.futebol12.nexus/zas/de.png); }
.FRA .estado::after { background-image: url(https://img.futebol12.nexus/zas/fr.png); }
.CHA .estado::after { background-image: url(https://img.futebol12.nexus/zas/champions.png); }
.UE .estado::after { background-image: url(https://img.futebol12.nexus/zas/ue.png); }
.NBA .estado::after { background-image: url(https://img.futebol12.nexus/zas/nbanew2.png); }
.FIFA .estado::after { background-image: url(https://img.futebol12.nexus/zas/fifa.png); }
.AMERICA .estado::after { background-image: url(https://img.futebol12.nexus/zas/copaamerica.png); }
.MLS .estado::after { background-image: url(https://img.futebol12.nexus/zas/mls.png); }

/* Estilo visual para escudos */
.estado::after {
  content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-left: 6px;
  vertical-align: middle;
}
  `;
  document.head.appendChild(style);
})();

// Detectar clase por nombre
function detectarClaseLiga(nombre) {
  for (const liga in clasesLiga) {
    if (nombre.toLowerCase().includes(liga.toLowerCase())) {
      return clasesLiga[liga];
    }
  }
  return null;
}

// Insertar clase en el evento
function insertarClasesLiga() {
  document.querySelectorAll('#agenda .evento').forEach(evento => {
    const nombreSpan = evento.querySelector('.nombre');
    if (!nombreSpan) return;

    const nombre = nombreSpan.textContent.trim();
    const clase = detectarClaseLiga(nombre);

    if (clase && !evento.classList.contains(clase)) {
      evento.classList.add(clase);
    }
  });
}

// Esperar a que se cargue la agenda
const esperar = setInterval(() => {
  const eventos = document.querySelectorAll('#agenda .evento .nombre');
  if (eventos.length > 0) {
    clearInterval(esperar);
    insertarClasesLiga();
  }
}, 300);
