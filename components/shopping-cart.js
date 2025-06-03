class ShoppingCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.items = [];
    this.storageKey = 'panier_ecommerce';
    this.stateKey = 'etat_panier';
    this.isOpen = false;
  }

  connectedCallback() {
    this.loadCart();
    this.loadState();
    this.render();

    window.addEventListener('add-to-cart', this.handleAddToCart.bind(this));
    window.addEventListener('increment-item', this.handleIncrement.bind(this));
    window.addEventListener('decrement-item', this.handleDecrement.bind(this));

    document.addEventListener('click', (e) => {
      if (e.target.matches('#toggle-cart')) {
        this.isOpen = !this.isOpen;
        this.saveState();
        this.render();
      }
    });
  }

  handleAddToCart(event) {
    const { title, price, image, category } = event.detail;
    const existing = this.items.find(i => i.title === title && i.price === price);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ title, price, image, category, quantity: 1 });
    }

    this.isOpen = true;
    this.saveCart();
    this.saveState();
    this.render();
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

  saveState() {
    localStorage.setItem(this.stateKey, JSON.stringify(this.isOpen));
  }

  loadState() {
    const state = localStorage.getItem(this.stateKey);
    if (state !== null) {
      this.isOpen = JSON.parse(state);
    }
  }

  render() {
    const total = this.getTotal();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          width: 320px;
          background-color: var(--bg-main, #fff);
          color: var(--text-main, #1a1a1a);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          padding: 1rem;
          max-height: 80vh;
          overflow-y: auto;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform: ${this.isOpen ? 'translateY(0)' : 'translateY(120%)'};
          opacity: ${this.isOpen ? '1' : '0'};
          pointer-events: ${this.isOpen ? 'auto' : 'none'};
          z-index: 999;
        }

        h3 {
          margin: 0 0 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-bottom: 0.5rem;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .total {
          margin-top: 1rem;
          font-weight: 600;
          font-size: 1rem;
          text-align: right;
          color: var(--accent, #444);
        }

        .empty {
          text-align: center;
          font-style: italic;
          color: #888;
          padding: 1rem 0;
        }

        .clear {
          margin-top: 0.5rem;
          text-align: right;
        }

        .clear button {
          background: none;
          border: none;
          color: var(--accent, #666);
          font-size: 0.85rem;
          cursor: pointer;
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .clear button:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--accent-hover, #000);
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
                  image="${item.image}" 
                  category="${item.category}" 
                  quantity="${item.quantity}">
                </cart-item>
              </li>
            `).join('')}
      </ul>

      <div class="total">Total : ${total.toLocaleString()} XPF</div>

      ${this.items.length > 0 ? `
        <div class="clear">
          <button id="clear-cart">🗑️ Vider le panier</button>
        </div>
      ` : ''}
    `;

    const clearBtn = this.shadowRoot.querySelector('#clear-cart');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.items = [];
        this.saveCart();
        this.render();
      });
    }
  }
}

customElements.define('shopping-cart', ShoppingCart);
