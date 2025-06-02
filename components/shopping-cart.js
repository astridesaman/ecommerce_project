// components/shopping-cart.js

class ShoppingCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.items = [];
    this.storageKey = 'panier_ecommerce';
  }

  connectedCallback() {
    this.loadCart();
    this.render();
    window.addEventListener('add-to-cart', this.handleAddToCart.bind(this));
    window.addEventListener('increment-item', this.handleIncrement.bind(this));
    window.addEventListener('decrement-item', this.handleDecrement.bind(this));

  }

  handleIncrement(event) {
  const { title, price } = event.detail;
  const item = this.items.find(i => i.title === title && i.price === price);
  if (item) {
    item.quantity += 1;
    this.saveCart();
    this.render();
  }
}

    handleDecrement(event) {
    const { title, price } = event.detail;
    const index = this.items.findIndex(i => i.title === title && i.price === price);
    if (index !== -1) {
        const item = this.items[index];
        item.quantity -= 1;
        if (item.quantity <= 0) {
        this.items.splice(index, 1);
        }
        this.saveCart();
        this.render();
    }
    }


  getTotal() {
    return this.items.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  loadCart() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.items = JSON.parse(data);
    }
  }

  render() {
    const total = this.getTotal();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          background: var(--color-sable, #fff);
          border: 2px solid var(--color-océan, #006d77);
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h3 {
          margin-top: 0;
          color: var(--color-océan, #006d77);
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .total {
          margin-top: 1rem;
          font-weight: bold;
          font-size: 1.1rem;
          color: var(--color-hibiscus, #ff5e5b);
          text-align: right;
        }
        .empty {
          color: #888;
          font-style: italic;
        }
      </style>

      <h3>🛒 Panier</h3>
      <ul>
        ${this.items.length === 0
          ? `<li class="empty">Aucun article</li>`
          : this.items.map(item => `
              <li>
                <cart-item 
                  title="${item.title}" 
                  price="${item.price}" 
                  quantity="${item.quantity}">
                </cart-item>
              </li>
            `).join('')}
      </ul>
      <div class="total">
        Total : ${total} XPF
      </div>
    `;
  }
}

customElements.define('shopping-cart', ShoppingCart);
