class ProductList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.products = [
      {
        title: "Smartphone",
        price: "159990",
        image: "/img/iphone16.jpg",
        category: "iPhone 16"
      },
      {
        title: "T-shirt Bio",
        price: "4999",
        image: "img/tshirt.jpg",
        category: "T-shirt"
      },
      {
        title: "Sweat Éco",
        price: "8999",
        image: "/img/sweat eco.jpg",
        category: "Sweat Éco"
      },
      {
        title: "Casquette Mix",
        price: "1999",
        image: "/img/casquette mix.jpg",
        category: "Casquette Mix"
      }
    ];
    this.filteredProducts = [...this.products];
  }

  connectedCallback() {
    this.render();
    window.addEventListener('filter-changed', (e) => {
      const { category, price } = e.detail;
      this.applyFilters(category, price);
    });
  }

  applyFilters(category, maxPrice) {
    this.filteredProducts = this.products.filter(p => {
      const matchCategory = category === "all" || p.category === category;
      const matchPrice = parseInt(p.price) <= maxPrice;
      return matchCategory && matchPrice;
    });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
        }
      </style>
      <div class="grid">
        ${this.filteredProducts.map(product => `
          <product-card-lit
            title="${product.title}"
            price="${product.price}"
            image="${product.image}"
            category="${product.category}">
            <h3 slot="title">${product.title}</h3>
            <p class="price" slot="price">${parseInt(product.price).toLocaleString()} XPF</p>
            <p class="category" slot="category">${product.category}</p>
            <button class="add-to-cart" slot="actions">Ajouter au panier</button>
          </product-card-lit>
        `).join('')}
      </div>
    `;

    // 🔗 Connecter les boutons "Ajouter au panier" après le rendu
    requestAnimationFrame(() => {
      const cards = this.shadowRoot.querySelectorAll('product-card-lit');
      cards.forEach(card => {
        const button = card.querySelector('button.add-to-cart');
        if (button) {
          button.addEventListener('click', () => {
            const detail = {
              title: card.getAttribute('title'),
              price: card.getAttribute('price'),
              image: card.getAttribute('image'),
              category: card.getAttribute('category')
            };
            card.dispatchEvent(new CustomEvent('add-to-cart', {
              detail,
              bubbles: true,
              composed: true
            }));
          });
        }
      });
    });
  }
}

customElements.define('product-list', ProductList);
