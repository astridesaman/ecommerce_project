// components/product-list.js

class ProductList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.products = [
      { title: 'T-shirt', price: '3900', image: '/assets/tshirt.jpg' },
      { title: 'Casquette Mix', price: '2500', image: '/assets/casquette.jpg' },
      { title: 'Sweat Éco', price: '5900', image: '/assets/sweat.jpg' }
    ];
    this.filteredProducts = [...this.products];
  }

  connectedCallback() {
    this.render();

    window.addEventListener('filter-changed', (e) => {
      const { category, price } = e.detail;
      this.filteredProducts = this.products.filter(prod => {
        const matchCategory = category === 'all' || prod.title === category;
        const matchPrice = parseInt(prod.price) <= price;
        return matchCategory && matchPrice;
      });
      this.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
        }
      </style>
      <div class="grid">
        ${this.filteredProducts.map(product => `
          <product-card 
            title="${product.title}" 
            price="${product.price}" 
            image="${product.image}">
          </product-card>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('product-list', ProductList);
