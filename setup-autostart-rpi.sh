#!/bin/bash
# ================================================================
#   Configure le demarrage automatique de Gestion Fer au boot
#   du Raspberry Pi, via systemd (plus fiable que cron/rc.local)
# ================================================================
set -e

INSTALL_DIR="$HOME/fer-manager"
SERVICE_FILE="/etc/systemd/system/fer-manager.service"

echo "================================================"
echo "  Configuration du demarrage automatique"
echo "================================================"

sudo tee "$SERVICE_FILE" > /dev/null << SERVICEEOF
[Unit]
Description=Gestion Fer - Application web
Requires=docker.service
After=docker.service network-online.target
Wants=network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$INSTALL_DIR
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0
User=$USER

[Install]
WantedBy=multi-user.target
SERVICEEOF

sudo systemctl daemon-reload
sudo systemctl enable fer-manager.service

echo ""
echo "================================================"
echo "  OK ! Gestion Fer demarrera automatiquement"
echo "  a chaque redemarrage du Raspberry Pi."
echo ""
echo "  Commandes utiles :"
echo "    sudo systemctl status fer-manager   -> voir l'etat"
echo "    sudo systemctl restart fer-manager  -> redemarrer"
echo "    sudo journalctl -u fer-manager -f   -> voir les logs"
echo "================================================"
