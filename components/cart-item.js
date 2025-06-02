// components/cart-item.js

class CartItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const title = this.getAttribute('title') || 'Article';
    const price = this.getAttribute('price') || '0';
    const quantity = this.getAttribute('quantity') || '1';

    this.shadowRoot.innerHTML = `
      <style>
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--color-sable, #fff);
          border-bottom: 1px solid #ddd;
          border-radius: 6px;
        }
        .title {
          flex: 1;
        }
        .controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        button {
          background: var(--color-coco, #e29578);
          border: none;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
        }
        .qty {
          min-width: 20px;
          text-align: center;
          font-weight: bold;
        }
      </style>
      <div class="item">
        <span class="title">${title}</span>
        <div class="controls">
          <button id="minus">−</button>
          <span class="qty">${quantity}</span>
          <button id="plus">+</button>
        </div>
        <span class="price">${price} XPF</span>
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
