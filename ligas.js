
// Diccionario de clases por liga
const clasesLiga = {
  "MLS": "MLS",
  "Liga MX": "MEX",
  "Liga BetPlay": "COL",
  "Serie A Ecuador": "ECUA",
  "Serie B Ecuador": "ECUA",
  "Primera División Costa Rica": "CR",
  "Brasileirão": "BRA",
  "Copa Uruguay": "URU",
  "Copa Argentina": "AR",
  "CONCACAF Champions Cup": "CONCACAFCHA",
  "CONCACAF Central American Cup": "CENTRALAMERICANCUP",
  "Copa Libertadores": "LIB",
  "Copa Sudamericana": "SUD",
  "Premier League": "ENG",
  "LaLiga": "ES",
  "Serie A": "IT",
  "Bundesliga": "ALE",
  "Ligue 1": "FRA",
  "Champions League": "CHA",
  "Europa League": "UE",
  "Conference League": "UEC",
  "Copa del Rey": "ESCOPAREY",
  "FA Cup": "ENGFACUP",
  "DFB Pokal": "ALE1",
  "FIFA World Cup": "FIFA",
  "UEFA Euro": "EURO",
  "Copa América": "AMERICA",
  "NBA": "NBA",
  "EuroLeague": "EUROLEAGUE",
  "Liga Nacional de Básquet": "ENDESA"
  // Puedes seguir agregando más si lo deseas
};

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
