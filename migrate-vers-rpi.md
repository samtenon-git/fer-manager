# Migration vers un Raspberry Pi

## Depuis le laptop Windows actuel (Tartous)

1. **Exporter la base de données** :
   - Ouvrir l'application dans le navigateur
   - Menu "Sauvegarde" → "Télécharger une sauvegarde"
   - Ceci télécharge un fichier `fer-backup-YYYY-MM-DD.db`

   Ou directement en copiant le fichier :
   ```
   C:\fer-manager\data\fer.db
   ```

## Sur le nouveau Raspberry Pi

1. **Installer le système** (une seule fois) :
   ```bash
   curl -sSL https://raw.githubusercontent.com/samtenon-git/fer-manager/main/install-rpi.sh -o install-rpi.sh
   bash install-rpi.sh
   ```

2. **Copier la base de données récupérée** :
   ```bash
   # Arrêter l'application le temps de la copie
   cd ~/fer-manager
   sudo docker compose down

   # Copier le fichier fer.db exporté à cet emplacement :
   cp /chemin/vers/fer-backup-XXXX.db ~/fer-manager/data/fer.db

   # Relancer
   sudo docker compose up -d
   ```

3. **Configurer le démarrage automatique** :
   ```bash
   bash setup-autostart-rpi.sh
   ```

4. **Connecter Tailscale** (si pas déjà fait pendant l'installation) :
   ```bash
   sudo tailscale up
   ```
   Notez la nouvelle IP Tailscale du Raspberry Pi sur https://login.tailscale.com/admin/machines
   — elle remplacera l'ancienne IP du laptop Windows (100.99.98.17) dans vos raccourcis.

## Vérification

```bash
sudo docker compose ps        # doit afficher "Up"
curl http://localhost:5000    # doit répondre du HTML
```

Ouvrez ensuite `http://[IP-TAILSCALE-DU-RPI]:5000` depuis n'importe quel appareil connecté à Tailscale.
