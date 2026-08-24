FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Chromium headless pour la generation PDF (Playwright), avec toutes ses
# dependances systeme installees automatiquement par --with-deps.
RUN playwright install --with-deps chromium

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
