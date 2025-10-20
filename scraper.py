import requests
import json
from bs4 import BeautifulSoup
from datetime import datetime
from difflib import SequenceMatcher

def similares(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio() > 0.7

def cargar_agenda():
    with open("marcadores.json", "r", encoding="utf-8") as f:
        return json.load(f)

def extraer_eventos_con_marcador():
    fecha = datetime.now().strftime("%Y-%m-%d")
    url = f"https://www.livesoccertv.com/es/schedules/{fecha}/"
    headers = { "User-Agent": "Mozilla/5.0" }

    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, "html.parser")
    eventos = soup.find_all("div", class_="match-row")

    lista = []
    for e in eventos:
        equipos = e.find("div", class_="teams")
        hora = e.find("div", class_="time")
        liga = e.find("div", class_="competition")
        marcador = e.find("div", class_="score")

        if equipos and hora and liga:
            lista.append({
                "hora": hora.text.strip(),
                "equipos": equipos.text.strip(),
                "liga": liga.text.strip(),
                "marcador": marcador.text.strip() if marcador else ""
            })
    return lista

def guardar_agenda(data):
    with open("marcadores.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

agenda = cargar_agenda()
eventos_live = extraer_eventos_con_marcador()

for evento in agenda:
    for live in eventos_live:
        if evento["hora"] == live["hora"] and similares(evento["equipos"], live["equipos"]):
            evento["marcador"] = live["marcador"]

guardar_agenda(agenda)
