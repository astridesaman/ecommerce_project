class CartItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Article';
    const price = this.getAttribute('price') || '0';
    const quantity = this.getAttribute('quantity') || '1';
    const image = this.getAttribute('image') || '';
    const category = this.getAttribute('category') || '';

    this.shadowRoot.innerHTML = `
      <style>
        .item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-main, #fff);
          padding: 0.75rem;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .thumb {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          object-fit: cover;
        }

        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .title {
          font-weight: bold;
          font-size: 0.95rem;
          color: var(--text-main, #222);
        }

        .category {
          font-size: 0.75rem;
          color: #777;
        }

        .controls {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }

        .qty {
          font-weight: bold;
          min-width: 20px;
          text-align: center;
        }

        button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
        }

        button:hover {
          background: #2563eb;
        }

        .price {
          font-size: 0.85rem;
          color: #444;
        }
      </style>

      <div class="item">
        <img class="thumb" src="${image}" alt="${title}">
        <div class="info">
          <span class="title">${title}</span>
          <span class="category">${category}</span>
          <span class="price">${price} XPF</span>
        </div>
        <div class="controls">
          <button id="minus">−</button>
          <span class="qty">${quantity}</span>
          <button id="plus">+</button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#plus').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('increment-item', {
        bubbles: true,
        composed: true,
        detail: { title, price }
      }));
    });

    this.shadowRoot.querySelector('#minus').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('decrement-item', {
        bubbles: true,
        composed: true,
        detail: { title, price }
      }));
    });
  }
}

customElements.define('cart-item', CartItem);
