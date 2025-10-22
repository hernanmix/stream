import requests
import json

eventos = {
    "bayern-brugge": 14566571
}

marcadores = {}

for nombre, event_id in eventos.items():
    url = f"https://api.sofascore.com/api/v1/event/{event_id}/summary"
    print(f"🔗 Consultando: {url}")
    res = requests.get(url)

    if res.status_code == 200:
        data = res.json()
        try:
            home = data["event"]["homeTeam"]["name"]
            away = data["event"]["awayTeam"]["name"]
            home_score = data["event"]["homeScore"]["current"]
            away_score = data["event"]["awayScore"]["current"]
            status = data["event"]["status"]["type"]

            estado = "EN JUEGO" if status == "inprogress" else "FINALIZADO" if status == "finished" else "PRÓXIMO"
            marcador = f"{home} {home_score} - {away_score} {away}"

            print(f"✅ {nombre}: {marcador} ({estado})")

            marcadores[nombre] = {
                "score": marcador,
                "estado": estado
            }
        except Exception as e:
            print(f"⚠️ Error al procesar datos para {nombre}: {e}")
    else:
        print(f"❌ Error HTTP {res.status_code} al obtener datos para {nombre}")

# Guardar solo si hay datos
if marcadores:
    with open("marcadores.json", "w", encoding="utf-8") as f:
        json.dump(marcadores, f, ensure_ascii=False, indent=2)
    print("📁 Archivo marcadores.json actualizado")
else:
    print("⚠️ No se generó ningún marcador. Archivo no actualizado.")
