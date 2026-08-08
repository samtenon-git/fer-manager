# 🔩 Fer Manager — Gestion Magasin de Fer

## Lancement rapide (Windows)

1. Ouvrez un terminal PowerShell ou CMD dans ce dossier
2. Tapez :
   ```
   docker compose up --build
   ```
3. Attendez que vous voyez : `Running on http://0.0.0.0:5000`
4. Ouvrez votre navigateur : **http://localhost:5000**

## Accès depuis un téléphone (même réseau Wi-Fi)
- Trouvez l'IP de votre PC : ouvrez CMD → tapez `ipconfig` → cherchez "IPv4 Address"
- Sur le téléphone : `http://192.168.X.X:5000`

## Arrêt
```
Ctrl+C  puis  docker compose down
```

## Les données
Tout est sauvegardé dans le dossier `data/fer.db` (SQLite).
Pour sauvegarder, copiez simplement ce fichier.
