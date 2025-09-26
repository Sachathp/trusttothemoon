# TRUST Airdrop Simulator 🚀

Un simulateur d'airdrop moderne et interactif inspiré d'Intuition, développé avec React + Vite + Tailwind CSS.

## 🌟 Fonctionnalités

- **Calcul en temps réel** des gains d'airdrop TRUST
- **Interface moderne** avec effets glassmorphism
- **Sélection de relics** avec multiplicateurs
- **Rôles Discord** avec bonus hiérarchiques
- **Design responsive** adapté mobile/desktop
- **Animations fluides** avec Framer Motion

## 🚀 Déploiement

### Option 1 : GitHub Pages (Automatique)

1. **Fork/Clone** ce repository
2. **Modifiez** `vite.config.js` : remplacez `/trust-airdrop-sim/` par le nom de votre repo
3. **Push** vers votre repository GitHub
4. **Activez** GitHub Pages dans Settings > Pages > Source: GitHub Actions
5. Le site sera automatiquement déployé à chaque push !

### Option 2 : Déploiement manuel

```bash
# Build du projet
npm run build

# Déploiement (après avoir modifié deploy.sh)
npm run deploy
```

### Option 3 : Autres plateformes

- **Vercel** : Connectez votre repo GitHub, déploiement automatique
- **Netlify** : Drag & drop du dossier `dist/` ou connexion GitHub
- **Surge.sh** : `npm install -g surge && surge dist/`

## 🛠️ Développement

```bash
# Installation
npm install

# Serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 📝 Configuration

### GitHub Pages
Modifiez dans `vite.config.js` :
```js
base: '/votre-nom-de-repo/', // Remplacez par votre repo
```

### Variables d'environnement
Créez un fichier `.env.local` pour vos configurations :
```env
VITE_APP_TITLE=Mon Simulateur
VITE_TRUST_PRICE=0.042
```

## 🎨 Personnalisation

### Couleurs
Modifiez `tailwind.config.cjs` pour changer la palette de couleurs.

### Multiplicateurs
Ajustez les valeurs dans `src/App.jsx` :
- `RELIC_TYPES` : Multiplicateurs des relics
- `DISCORD_ROLES` : Bonus des rôles Discord

## 📦 Technologies utilisées

- **React 18** - Interface utilisateur
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations
- **GitHub Actions** - CI/CD automatique

## ⚠️ Avertissement

Ce simulateur est fictif et à des fins de démonstration uniquement.

---

**Powered by [Intuition](https://portal.intuition.systems/)**