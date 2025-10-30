// Diccionario de clases por liga (puedes expandirlo si quieres más detecciones)
const clasesLiga = {
  "Premier League": "ENG",
  "LaLiga": "ES",
  "Serie A": "IT",
  "Bundesliga": "ALE",
  "Ligue 1": "FRA",
  "Liga MX": "MEX",
  "Liga BetPlay": "COL",
  "Serie A Ecuador": "ECUA",
  "MLS": "MLS",
  "Champions League": "CHA",
  "Europa League": "UE",
  "Copa Libertadores": "LIB",
  "Copa Sudamericana": "SUD",
  "Copa América": "AMERICA",
  "FIFA World Cup": "FIFA",
  "NBA": "NBA",
  "WWE": "WWE",
  "UFC": "UFC",
  "F1": "F1",
  "F2": "F2",
  "F3": "F3"
  // Puedes seguir agregando más si lo deseas
};

// Inyectar tu CSS completo con estilo visual mejorado
(function injectCSS() {
  const style = document.createElement("style");
  style.innerHTML = `
${/* Aquí va todo tu CSS original */''}
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
.PE > a:before { background-image: url(https://img.futebol12.nexus/zas/pe.png); }
.AR > a:before { background-image: url(https://img.futebol12.nexus/zas/ar.png); }
.FIFA > a:before { background-image: url(https://img.futebol12.nexus/zas/fifa.png); }
.BRA > a:before { background-image: url(https://img.futebol12.nexus/zas/br.png); }
.URU > a:before { background-image: url(https://img.futebol12.nexus/zas/uy.png); }
.LIB > a:before { background-image: url(https://img.futebol12.nexus/zas/libertadores.png); }
.SUD > a:before { background-image: url(https://img.futebol12.nexus/zas/sud.png); }
.UEC > a:before { background-image: url(https://img.futebol12.nexus/zas/uec.png); }
.AMERICA > a:before { background-image: url(https://img.futebol12.nexus/zas/copaamerica.png); }
/* ... continúa con TODO el CSS que me diste ... */

/* Estilo visual para los escudos */
#agenda .evento > a:before {
  content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 6px;
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
