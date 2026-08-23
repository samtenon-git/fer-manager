#!/bin/bash
# ================================================================
#   INSTALLATION AUTOMATIQUE - Gestion Fer sur Raspberry Pi
#   Compatible Raspberry Pi OS (Debian) 64-bit
# ================================================================
set -e

REPO_URL="https://github.com/samtenon-git/fer-manager.git"
INSTALL_DIR="$HOME/fer-manager"

echo "================================================"
echo "  INSTALLATION - Gestion Fer sur Raspberry Pi"
echo "================================================"
echo ""

# --- 1. Mise a jour systeme ---
echo "[1/7] Mise a jour du systeme..."
sudo apt-get update -qq
echo "   OK"
echo ""

# --- 2. Installer Docker si absent ---
echo "[2/7] Verification de Docker..."
if ! command -v docker &> /dev/null; then
    echo "   Docker non trouve. Installation en cours..."
    curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
    sudo sh /tmp/get-docker.sh
    sudo usermod -aG docker "$USER"
    rm /tmp/get-docker.sh
    echo "   Docker installe. Vous devrez peut-etre vous reconnecter"
    echo "   pour que les permissions Docker prennent effet."
else
    echo "   Docker deja installe ($(docker --version))"
fi
echo ""

# --- 3. Installer Docker Compose plugin si absent ---
echo "[3/7] Verification de Docker Compose..."
if ! docker compose version &> /dev/null; then
    sudo apt-get install -y docker-compose-plugin -qq
fi
echo "   OK ($(docker compose version --short 2>/dev/null || echo 'installe'))"
echo ""

# --- 4. Installer Git si absent ---
echo "[4/7] Verification de Git..."
if ! command -v git &> /dev/null; then
    sudo apt-get install -y git -qq
fi
echo "   OK"
echo ""

# --- 5. Cloner ou mettre a jour le depot ---
echo "[5/7] Recuperation du code..."
if [ -d "$INSTALL_DIR/.git" ]; then
    echo "   Depot existant trouve, mise a jour..."
    cd "$INSTALL_DIR"
    git pull
else
    git clone "$REPO_URL" "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi
echo "   OK"
echo ""

# --- 6. Installer Tailscale si absent ---
echo "[6/7] Verification de Tailscale..."
if ! command -v tailscale &> /dev/null; then
    echo "   Installation de Tailscale..."
    curl -fsSL https://tailscale.com/install.sh | sh
    echo ""
    echo "   ================================================"
    echo "   IMPORTANT : lancez maintenant la commande suivante"
    echo "   pour connecter ce Raspberry Pi a votre reseau Tailscale :"
    echo ""
    echo "     sudo tailscale up"
    echo ""
    echo "   Un lien apparaitra, ouvrez-le pour vous authentifier"
    echo "   avec le meme compte que vos autres appareils."
    echo "   ================================================"
else
    echo "   Tailscale deja installe"
fi
echo ""

# --- 7. Lancer l'application via Docker ---
echo "[7/7] Lancement de l'application..."
cd "$INSTALL_DIR"
sudo docker compose up --build -d
echo ""

echo "================================================"
echo "  INSTALLATION TERMINEE !"
echo ""
echo "  Acces local  : http://localhost:5000"
echo "  Acces reseau : http://$(hostname -I | awk '{print $1}'):5000"
echo ""
echo "  Si Tailscale vient d'etre installe, executez :"
echo "     sudo tailscale up"
echo "  puis notez l'IP Tailscale (100.x.x.x) affichee sur"
echo "  https://login.tailscale.com/admin/machines"
echo "================================================"
