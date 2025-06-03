# E-Commerce – Projet Web Components

Un site e-commerce moderne et éco-responsable, conçu avec des **Web Components** (utilisant `Lit`, `Shadow DOM`, `slots`, `events`, et `localStorage`). Il permet de filtrer des produits, de les ajouter dynamiquement au panier, tout en assurant une expérience utilisateur fluide.

---

## 🧩 Fonctionnalités

- 🔸 **Affichage dynamique des produits** avec `product-list` et `product-card-lit`
- 🔸 **Ajout au panier** via des événements personnalisés
- 🔸 **Panier interactif** (`shopping-cart`) avec sauvegarde `localStorage`
- 🔸 **Filtres dynamiques** (`filter-bar`) sur la catégorie et le prix
- 🔸 **Thème clair / sombre** via `theme-toggle`
- 🔸 **Encapsulation complète** via `Shadow DOM` et `slots`

---

## 📁 Structure des fichiers

/
├── index.html # Fichier principal HTML
├── styles.css # Style global
├── components/
│ ├── product-list.js # Génère la grille de produits
│ ├── product-card-lit.js # Carte individuelle de produit (avec <slot>)
│ ├── shopping-cart.js # Panier avec événements "add", "increment", "decrement"
│ ├── cart-item.js # Item affiché dans le panier
│ ├── filter-bar.js # Barre de filtrage (catégorie + prix max)
│ └── theme-toggle.js # Switch Dark/Light mode
├── img/
│ ├── iphone16.jpg # Exemple de produit
│ ├── tshirt.jpg
│ ├── sweat eco.jpg
│ └── casquette.jpg


# 👨‍💻 Auteurs
- Réalisé par Astride Saman dans le cadre d'un projet universitaire / personnel en 2025.
