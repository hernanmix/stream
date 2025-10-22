import requests
import json

# ID del partido Bayern vs Club Brugge (puedes agregar más luego)
eventos = {
    "bayern-brugge": 14566571
}

# Diccionario final para tu agenda
marcadores = {}

for nombre, event_id in eventos.items():
    url = f"https://api.sofascore.com/api/v1/event/{event_id}/summary"
    res = requests.get(url)
    if res.status_code == 200:
        data = res.json()
        home = data["event"]["homeTeam"]["name"]
        away = data["event"]["awayTeam"]["name"]
        home_score = data["event"]["homeScore"]["current"]
        away_score = data["event"]["awayScore"]["current"]
        status = data["event"]["status"]["type"]  # "inprogress", "finished", etc.

        estado = "EN JUEGO" if status == "inprogress" else "FINALIZADO" if status == "finished" else "PRÓXIMO"

        marcador = f"{home} {home_score} - {away_score} {away}"
        marcadores[nombre] = {
            "score": marcador,
            "estado": estado
        }
    else:
        print(f"Error al obtener datos para {nombre}")

# Guardar como JSON
with open("marcadores.json", "w", encoding="utf-8") as f:
    json.dump(marcadores, f, ensure_ascii=False, indent=2)

print("✅ Archivo marcadores.json actualizado")
