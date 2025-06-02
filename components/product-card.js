// components/product-card.js

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const title = this.getAttribute('title') || 'Produit';
    const price = this.getAttribute('price') || '0';
    const image = this.getAttribute('image') || '';

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: var(--color-sable, #fef6e4);
          border: 2px solid var(--color-coco, #e29578);
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease;
          text-align: center;
        }
        .card:hover {
          transform: scale(1.03);
        }
        img {
          width: 100%;
          height: auto;
          border-radius: 6px;
        }
        h3 {
          margin: 0.5rem 0 0.25rem;
        }
        p {
          margin: 0;
          color: #4b5563;
          font-weight: bold;
        }
        button {
          margin-top: 0.75rem;
          background-color: var(--color-océan, #006d77);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        button:hover {
          background-color: #045b62;
        }
      </style>

      <div class="card">
        <img src="${image}" alt="${title}" />
        <h3>${title}</h3>
        <p>${price} XPF</p>
        <button>Ajouter au panier</button>
      </div>
    `;

    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add-to-cart', {
        bubbles: true,
        composed: true,
        detail: { title, price }
      }));
    });
  }
}

customElements.define('product-card', ProductCard);