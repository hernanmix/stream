// Diccionario ampliado de escudos por liga
const escudos = {
  // América
  "MLS": "https://upload.wikimedia.org/wikipedia/en/e/e0/Major_League_Soccer_logo.svg",
  "Liga MX": "https://img.futebol12.nexus/zas/pt.png",
  "Liga BetPlay": "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg",
  "Serie A Ecuador": "https://img.futebol12.nexus/zas/cl.png",
  "Serie B Ecuador": "https://img.futebol12.nexus/zas/cl.png",
  "Primera División Costa Rica": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Costa_Rica.svg",
  "Brasileirão": "https://upload.wikimedia.org/wikipedia/en/0/01/Campeonato_Brasileiro_Série_A_logo.png",
  "Copa Uruguay": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg",
  "Copa Argentina": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
  "CONCACAF Champions Cup": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Central_America.svg",
  "CONCACAF Central American Cup": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Central_America.svg",
  "Copa Libertadores": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Copa_Libertadores_logo.png",
  "Copa Sudamericana": "https://upload.wikimedia.org/wikipedia/en/1/1d/Copa_Sudamericana_logo.svg",

  // Europa
  "Premier League": "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
  "LaLiga": "https://upload.wikimedia.org/wikipedia/en/1/13/LaLiga_logo.svg",
  "Serie A": "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg",
  "Bundesliga": "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",
  "Ligue 1": "https://upload.wikimedia.org/wikipedia/en/4/4e/Ligue_1_Uber_Eats_logo.svg",
  "Champions League": "https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Champions_League_logo_2021.svg",
  "Europa League": "https://upload.wikimedia.org/wikipedia/en/3/3d/UEFA_Europa_League_logo.svg",
  "Conference League": "https://upload.wikimedia.org/wikipedia/en/2/2e/UEFA_Europa_Conference_League_logo.svg",
  "Copa del Rey": "https://upload.wikimedia.org/wikipedia/en/5/5c/Copa_del_Rey_logo_2019.svg",
  "FA Cup": "https://upload.wikimedia.org/wikipedia/en/9/9c/FA_Cup_logo.svg",
  "DFB Pokal": "https://upload.wikimedia.org/wikipedia/en/3/3f/DFB-Pokal_logo_2022.svg",

  // Asia y África
  "AFC Champions League": "https://upload.wikimedia.org/wikipedia/en/3/3b/AFC_Champions_League_logo.svg",
  "Indian Super League": "https://upload.wikimedia.org/wikipedia/en/2/2e/Indian_Super_League_logo.svg",
  "J.League": "https://upload.wikimedia.org/wikipedia/en/3/3e/J.League_logo.svg",
  "K League": "https://upload.wikimedia.org/wikipedia/en/2/2e/K_League_1_logo.svg",
  "CAF Champions League": "https://upload.wikimedia.org/wikipedia/en/4/4e/CAF_Champions_League_logo.svg",

  // Internacionales
  "FIFA World Cup": "https://upload.wikimedia.org/wikipedia/en/5/5c/FIFA_World_Cup_2026_logo.svg",
  "UEFA Euro": "https://upload.wikimedia.org/wikipedia/en/4/4e/UEFA_Euro_2024_logo.svg",
  "Copa América": "https://upload.wikimedia.org/wikipedia/en/8/8f/Copa_América_2024_logo.svg",

  // Básquet
  "NBA": "https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg",
  "EuroLeague": "https://upload.wikimedia.org/wikipedia/en/7/7e/Euroleague_logo.svg",
  "Liga Nacional de Básquet": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg"
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

// Insertar escudos sin modificar texto
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
      img.style.height = '20px';
      img.style.verticalAlign = 'middle';
      img.style.marginLeft = '6px';
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
