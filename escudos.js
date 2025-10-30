// Diccionario de clases por liga
const clasesLiga = {
  "Premier League": "ENG",
  "LaLiga": "ES",
  "Serie A": "IT",
  "Bundesliga": "ALE",
  "Ligue 1": "FRA",
  "Eredivisie": "HOL",
  "Liga Portugal": "POR",
  "Liga MX": "MEX",
  "Liga BetPlay": "COL",
  "Serie A Ecuador": "ECUA",
  "Serie B Ecuador": "ECUA",
  "Primera División Costa Rica": "CR",
  "MLS": "USA",
  "Champions League": "CHA",
  "Europa League": "UE",
  "Copa Libertadores": "FUT",
  "Copa Sudamericana": "FUT",
  "Copa Chile": "CHI",
  "Scottish Premiership": "ESC",
  "Belgian Pro League": "BEL",
  "Turkish Super Lig": "TUR"
};

// Inyectar tu CSS tal como lo diste
(function injectCSS() {
  const style = document.createElement("style");
  style.innerHTML = `
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
.ESC > a:before { background-image: url(https://img.futebol12.nexus/zas/sx.png); }
.USA > a:before { background-image: url(https://img.futebol12.nexus/zas/us.png); }
.FUT > a:before { background-image: url(https://img.futebol12.nexus/zas/fut.webp); }
.CHA > a:before { background-image: url(https://img.futebol12.nexus/zas/champions.png); }
.UE > a:before { background-image: url(https://img.futebol12.nexus/zas/ue.png); }
.COL > a:before { background-image: url(https://img.futebol12.nexus/zas/co.png); }
.CHI > a:before { background-image: url(https://img.futebol12.nexus/zas/cl.png); }
.ECUA > a:before { background-image: url(https://img.futebol12.nexus/zas/ec.png); }
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
