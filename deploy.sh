#!/usr/bin/env sh

# Script de déploiement automatique pour GitHub Pages

set -e

# Build du projet
npm run build

# Navigation vers le dossier de build
cd dist

# Ajout d'un fichier .nojekyll pour éviter les problèmes avec GitHub Pages
echo > .nojekyll

# Initialisation du repo git dans le dossier dist
git init
git checkout -B main
git add -A
git commit -m 'deploy'

# Déploiement vers la branche gh-pages
# Remplacez <USERNAME> et <REPO> par vos vraies valeurs
git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -
