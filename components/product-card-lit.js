import { LitElement, html, css } from 'lit';

export class ProductCardLit extends LitElement {
  static properties = {
    image: { type: String },
    title: { type: String },
    price: { type: String },
    category: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      background: var(--bg-main, #fff);
      border: 1px solid #ddd;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
      font-family: 'Quicksand', sans-serif;
      transition: transform 0.2s ease;
      width: 100%;
      max-width: 300px;
      margin: auto;
    }

    :host(:hover) {
      transform: translateY(-3px);
    }

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    .content {
      padding: 1rem;
    }

    ::slotted(h3) {
      margin: 0.5rem 0;
      font-size: 1.2rem;
      color: var(--text-main, #222);
    }

    ::slotted(.price) {
      font-weight: bold;
      color: #2c3e50;
      font-size: 1rem;
    }

    ::slotted(.category) {
      font-size: 0.85rem;
      font-style: italic;
      color: #888;
      margin-top: 0.25rem;
    }

    ::slotted(button) {
      margin-top: 0.75rem;
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }

    ::slotted(button:hover) {
      background-color: #2563eb;
    }
  `;

  constructor() {
    super();
    this.image = '';
    this.title = '';
    this.price = '';
    this.category = '';
  }

  handleAddToCart() {
    this.dispatchEvent(new CustomEvent('add-to-cart', {
      detail: {
        title: this.title,
        price: this.price,
        image: this.image,
        category: this.category
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <img src="${this.image}" alt="${this.title}" />
      <div class="content">
        <slot name="title"></slot>
        <slot name="price"></slot>
        <slot name="image"></slot>
        <slot name="category"></slot>
        <slot name="actions" @click=${this.handleAddToCart}></slot>
      </div>
    `;
  }
}

customElements.define('product-card-lit', ProductCardLit);
