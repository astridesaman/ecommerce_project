# 🛍️ Boutique E-commerce Modulaire - Web Components

Ce projet est une application e-commerce moderne, minimaliste et modulaire utilisant des **Web Components** personnalisés. Il met l'accent sur l'écoconception, la performance et l'expérience utilisateur.

---

## 🚀 Fonctionnalités

- 🛒 **Panier interactif** avec gestion des articles et du total
- 📦 **Cartes produits dynamiques** (image, nom, prix, bouton)
- 🎛️ **Filtres par catégorie/prix** avec composants réutilisables
- 🌗 **Mode clair/sombre** avec commutateur `<theme-toggle>`
- ⚡ Architecture modulaire : chaque partie est un Web Component indépendant

---

## 🧱 Composants Web utilisés

| Composant         | Description                                 |
|------------------|---------------------------------------------|
| `<product-card>`  | Affiche un produit (image, nom, prix, bouton) |
| `<product-list>`  | Gère la liste de produits                  |
| `<filter-bar>`    | Barre de filtres (prix, catégorie, etc.)    |
| `<shopping-cart>` | Panier interactif                          |
| `<cart-item>`     | Affiche un article dans le panier           |
| `<theme-toggle>`  | Bascule entre thème clair et sombre         |

---

## 📂 Structure du projet

ecommerce-app/
├── index.html                # Maquette HTML principale
├── style.css                 # Styles globaux
├── components/
│   ├── product-card.js       # Web Component: Carte produit
│   ├── shopping-cart.js      # Web Component: Panier
│   ├── filter-bar.js         # Web Component: Barre de filtres
│   ├── theme-toggle.js       # Web Component: Changement de thème
├── assets/
│   ├── tshirt.jpg            # Images produits
│   └── ...                   # Autres fichiers d'images


---

## 🛠️ Technologies utilisées

- ✅ HTML5 / CSS3
- ✅ Web Components natifs (ou [Lit](https://lit.dev/) en option)
- ✅ JavaScript ES6+
- ✅ localStorage (pour persistance panier)

---

## 🧪 À venir

- [ ] Intégration API pour catalogue dynamique
- [ ] Système de promotions automatiques
- [ ] Authentification et historique de commandes
- [ ] Paiement (simulation)

---

## 💡 Installation rapide

```bash
git clone https://github.com/votre-utilisateur/ecommerce-web-components.git
cd ecommerce-web-components
# Ouvrir index.html dans le navigateur
