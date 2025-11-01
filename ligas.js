// Diccionario completo de escudos por nombre de liga
const escudos = {
  "Brasileirão": "https://bow.futebol12.nexus/zas/br.png",
  "Liga BetPlay": "https://bow.futebol12.nexus/zas/co.png",
  "LigaPro": "https://bow.futebol12.nexus/zas/ec.png",
  "Primeira Liga": "https://bow.futebol12.nexus/zas/pt.png",
  "Serie B Ecuador": "https://bow.futebol12.nexus/zas/ec.png",
  "Primera Nacional": "https://bow.futebol12.nexus/zas/ar.png",
  "CONCACAF Central American Cup": "https://bow.futebol12.nexus/zas/centralamericancup.png?new",
  "CONCACAF Champions Cup": "https://bow.futebol12.nexus/zas/concacafcham.png",
  "Copa Libertadores": "https://bow.futebol12.nexus/zas/libertadores.png",
  "Copa Sudamericana": "https://img.futebol12.nexus/zas/sud.png",
  "Premier League": "https://boy.futebol12.nexus/zas/en.png",
  "LaLiga": "https://img.futebol12.nexus/zas/es.png",
  "Liga Profesional Saudí": "https://bow.futebol12.nexus/zas/sa.png",
  "Serie A": "https://bow.futebol12.nexus/zas/it.png",
  "LaLiga 2": "https://img.futebol12.nexus/zas/es.png",
  "Bundesliga": "https://bow.futebol12.nexus/zas/de.png",
  "Superliga Argentina": "https://bow.futebol12.nexus/zas/ar.png",
  "Ligue 1": "https://img.futebol12.nexus/zas/fr.png",
  "Champions League": "https://img.futebol12.nexus/zas/champions.png",
  "Europa League": "https://img.futebol12.nexus/zas/ue.png",
  "Conference League": "https://img.futebol12.nexus/zas/uec.png",
  "Copa del Rey": "https://img.futebol12.nexus/zas/es.png",
  "FA Cup": "https://bow.futebol12.nexus/zas/en.png",
  "Championship": "https://bow.futebol12.nexus/zas/en.png",
  "DFB Pokal": "https://img.futebol12.nexus/zas/copaitalia.png",
  "FIFA World Cup": "https://img.futebol12.nexus/zas/fifa.png",
  "UEFA Euro": "https://img.futebol12.nexus/zas/eurocopa.png",
  "UFC": "https://img.futebol12.nexus/zas/ufc.png",
  "Copa América": "https://img.futebol12.nexus/zas/copaamerica.png",
  "MLS": "https://img.futebol12.nexus/zas/mls.png",
  "MLB": "https://bow.futebol12.nexus/zas/mlbnew.png",
  "Liga MX": "https://bow.futebol12.nexus/zas/mx.png",
  "NBA": "https://img.futebol12.nexus/zas/nbanew2.png",
  "Primera División": "https://img.golazoplay.com/uploads/uruguay_e2b9597af8.png",
  "EuroLeague": "https://img.futebol12.nexus/zas/euroleaguebasket.png",
  "Liga Nacional de Básquet": "https://img.futebol12.nexus/zas/endesa.png",
  "AFC Champions League": "https://bow.futebol12.nexus/zas/afcchampions.png",
  "CAF Champions League": "https://bow.futebol12.nexus/zas/caf.png",
  "Indian Super League": "https://img.futebol12.nexus/zas/asia.png?new",
  "J.League": "https://img.futebol12.nexus/zas/japan.png",
  "K League": "https://img.futebol12.nexus/zas/korea.png",
  "Primera División": "https://bow.futebol12.nexus/zas/paraguay.png",
  "Copa Venezuela": "https://img.futebol12.nexus/zas/ven.png",
  "Copa Honduras": "https://img.futebol12.nexus/zas/honduras.png",
  "Super Lig": "https://bow.futebol12.nexus/zas/tr.png",
  "Liga 1": "https://bow.futebol12.nexus/zas/pe.png",
  "Eredivisie": "https://bow.futebol12.nexus/zas/nl.png",
  "Primera División": "https://bow.futebol12.nexus/zas/cl.png",
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
