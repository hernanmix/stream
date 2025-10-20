name: Actualizar marcadores

on:
  schedule:
    - cron: '0 * * * *'  # Ejecuta cada hora
  workflow_dispatch:     # Permite ejecutarlo manualmente

jobs:
  run-scraper:
    runs-on: ubuntu-latest

    steps:
      - name: Clonar repositorio
        uses: actions/checkout@v3

      - name: Configurar Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'

      - name: Instalar dependencias
        run: pip install requests beautifulsoup4

      - name: Ejecutar script
        run: python scraper.py

      - name: Subir cambios
        run: |
          git config user.name "HERMIXER"
          git config user.email "hernantv94@users.noreply.github.com"
          git add marcadores.json
          git commit -m "Actualización automática de marcadores"
          git push
