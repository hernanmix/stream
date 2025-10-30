
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

// Inyectar todo tu CSS con escudos
(function injectCSS() {
  const style = document.createElement("style");
  style.innerHTML = `
/* Escudos por clase (fragmento, tú me diste todo esto) */
.TUR > a:before { background-image: url(https://img.futebol12.nexus/zas/tr.png); }
.ENG > a:before { background-image: url(https://img.futebol12.nexus/zas/en.png); }
.ALE > a:before { background-image: url(https://img.futebol12.nexus/zas/de.png); }
.FRA > a:before { background-image: url(https://img.futebol12.nexus/zas/fr.png); }
.HOL > a:before { background-image: url(https://img.futebol12.nexus/zas/nl.png); }
.POR > a:before { background-image: url(https://img.futebol12.nexus/zas/pt.png); }
.MEX > a:before { background-image: url(https://img.futebol12.nexus/zas/mx.png); }
.ES > a:before { background-image: url(https://img.futebol12.nexus/zas/es.png); }
.IT > a:before { background-image: url(https://img.futebol12.nexus/zas/it.png); }
.BEL > a:before { background-image: url(https://img.futebol12.nexus/zas/be.png); }
.CR > a:before { background-image: url(https://img.futebol12.nexus/zas/cr.png); }
.USA > a:before { background-image: url(https://img.futebol12.nexus/zas/us.png); }
.NBA > a:before { background-image: url(https://img.futebol12.nexus/zas/nbanew2.png); }
.BRA > a:before { background-image: url(https://img.futebol12.nexus/zas/br.png); }
.COL > a:before { background-image: url(https://img.futebol12.nexus/zas/co.png); }
.ECUA > a:before { background-image: url(https://img.futebol12.nexus/zas/ec.png); }
.CHA > a:before { background-image: url(https://img.futebol12.nexus/zas/champions.png); }
.UE > a:before { background-image: url(https://img.futebol12.nexus/zas/ue.png); }
.LIB > a:before { background-image: url(https://img.futebol12.nexus/zas/libertadores.png); }
.SUD > a:before { background-image: url(https://img.futebol12.nexus/zas/sud.png); }
.FIFA > a:before { background-image: url(https://img.futebol12.nexus/zas/fifa.png); }
.AMERICA > a:before { background-image: url(https://img.futebol12.nexus/zas/copaamerica.png); }
.CENTRALAMERICANCUP > a:before { background-image: url(https://img.futebol12.nexus/zas/centralamericancup.png?new); }
.CONCACAFCHA > a:before { background-image: url(https://img.futebol12.nexus/zas/concacafcham.png); }
.MLS > a:before { background-image: url(https://img.futebol12.nexus/zas/mls.png); }

/* Estilo visual para escudos */
.estado::after {
  content: "";
  display: inline-block;
  width: 22px;
  height: 22px;
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

// Insertar clase en el evento y aplicar escudo
function insertarClasesLiga() {
  document.querySelectorAll('#agenda .evento').forEach(evento => {
    const nombreSpan = evento.querySelector('.nombre');
    const estadoSpan = evento.querySelector('.estado');
    if (!nombreSpan || !estadoSpan) return;

    const nombre = nombreSpan.textContent.trim();
    const clase = detectarClaseLiga(nombre);

    if (clase && !evento.classList.contains(clase)) {
      evento.classList.add(clase);
      estadoSpan.classList.add('estado'); // Asegura que tenga la clase para el ::after
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
