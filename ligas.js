// Diccionario completo de escudos por nombre de liga
const escudos = {
  "Brasileirão": "https://img.futebol12.nexus/zas/br.png",
  "Liga BetPlay": "https://img.futebol12.nexus/zas/co.png",
  "Serie A Ecuador": "https://img.futebol12.nexus/zas/ec.png",
  "Serie B Ecuador": "https://img.futebol12.nexus/zas/ec.png",
  "Primera División Costa Rica": "https://img.futebol12.nexus/zas/cr.png",
  "CONCACAF Central American Cup": "https://img.futebol12.nexus/zas/centralamericancup.png?new",
  "CONCACAF Champions Cup": "https://img.futebol12.nexus/zas/concacafcham.png",
  "Copa Libertadores": "https://img.futebol12.nexus/zas/libertadores.png",
  "Copa Sudamericana": "https://img.futebol12.nexus/zas/sud.png",
  "Premier League": "https://img.futebol12.nexus/zas/en.png",
  "LaLiga": "https://img.futebol12.nexus/zas/es.png",
  "Copa del Rey1": "https://img.futebol12.nexus/zas/laliga.png",
  "Copa del Rey2": "https://img.futebol12.nexus/zas/laliga2.png",
  "Serie A": "https://img.futebol12.nexus/zas/it.png",
  "Bundesliga": "https://img.futebol12.nexus/zas/de.png",
  "Ligue 1": "https://img.futebol12.nexus/zas/fr.png",
  "Champions League": "https://img.futebol12.nexus/zas/champions.png",
  "Europa League": "https://img.futebol12.nexus/zas/ue.png",
  "Conference League": "https://img.futebol12.nexus/zas/uec.png",
  "Copa del Rey": "https://img.futebol12.nexus/zas/es.png",
  "FA Cup": "https://img.futebol12.nexus/zas/facup.png",
  "DFB Pokal": "https://img.futebol12.nexus/zas/copaitalia.png",
  "FIFA World Cup": "https://img.futebol12.nexus/zas/fifa.png",
  "UEFA Euro": "https://img.futebol12.nexus/zas/eurocopa.png",
  "UFC": "https://img.futebol12.nexus/zas/ufc.png",
  "Copa América": "https://img.futebol12.nexus/zas/copaamerica.png",
  "MLS": "https://img.futebol12.nexus/zas/mls.png",
  "MLB": "https://img.futebol12.nexus/zas/mlbnew.png",
  "Liga MX": "https://img.futebol12.nexus/zas/mx.png",
  "NBA": "https://img.futebol12.nexus/zas/nbanew2.png",
  "EuroLeague": "https://img.futebol12.nexus/zas/euroleaguebasket.png",
  "Liga Nacional de Básquet": "https://img.futebol12.nexus/zas/endesa.png",
  "AFC Champions League": "https://img.futebol12.nexus/zas/afcchampions.png",
  "CAF Champions League": "https://img.futebol12.nexus/zas/caf.png",
  "Indian Super League": "https://img.futebol12.nexus/zas/asia.png?new",
  "J.League": "https://img.futebol12.nexus/zas/japan.png",
  "K League": "https://img.futebol12.nexus/zas/korea.png",
  "Copa Argentina": "https://img.futebol12.nexus/zas/ar.png",
  "Copa Uruguay": "https://img.futebol12.nexus/zas/uy.png",
  "Copa Chile": "https://img.futebol12.nexus/zas/cl.png",
  "Copa Paraguay": "https://img.futebol12.nexus/zas/paraguay.png",
  "Copa Venezuela": "https://img.futebol12.nexus/zas/ven.png",
  "Copa Honduras": "https://img.futebol12.nexus/zas/honduras.png"
  // Puedes seguir agregando más si lo deseas
};

// Detectar escudo por nombre
function detectarEscudo(nombre) {
  for (const liga in escudos) {
    if (nombre.toLowerCase().includes(liga.toLowerCase())) {
      return escudos[liga];
    }
  }
  return null;
}

// Insertar escudos al lado de la hora
function insertarEscudos() {
  document.querySelectorAll('#agenda .evento').forEach(evento => {
    const nombreSpan = evento.querySelector('.nombre');
    const estadoSpan = evento.querySelector('.estado');
    if (!nombreSpan || !estadoSpan) return;

    const nombre = nombreSpan.textContent.trim();
    const escudo = detectarEscudo(nombre);

    if (escudo && !estadoSpan.parentElement.querySelector('.escudo')) {
      const img = document.createElement('img');
      img.src = escudo;
      img.className = 'escudo';
      img.style.height = '22px';
      img.style.width = '22px';
      img.style.borderRadius = '50%';
      img.style.marginLeft = '6px';
      img.style.verticalAlign = 'middle';
      estadoSpan.parentElement.insertBefore(img, estadoSpan.nextSibling);
    }
  });
}

// Esperar a que se cargue la agenda
const esperar = setInterval(() => {
  const eventos = document.querySelectorAll('#agenda .evento .nombre');
  if (eventos.length > 0) {
    clearInterval(esperar);
    insertarEscudos();
  }
}, 300);
