// components/filter-bar.js

class FilterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .filters {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          background: var(--color-océan, #006d77);
          color: white;
          border-radius: 8px;
          font-weight: 500;
        }
        label {
          display: flex;
          flex-direction: column;
          font-size: 0.9rem;
        }
        select {
          background: white;
          color: var(--color-océan, #006d77);
          padding: 0.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 500;
        }
      </style>
      <div class="filters">
        <label>Catégorie
          <select id="category">
            <option value="all">Tout</option>
            <option value="T-shirt DJ">T-shirt DJ</option>
            <option value="Casquette Mix">Casquette Mix</option>
            <option value="Sweat Éco">Sweat Éco</option>
          </select>
        </label>
        <label>Prix max
          <select id="price">
            <option value="10000">10 000</option>
            <option value="5000">5 000</option>
            <option value="3000">3 000</option>
          </select>
        </label>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('select').forEach(select => {
      select.addEventListener('change', () => {
        const category = this.shadowRoot.querySelector('#category').value;
        const price = parseInt(this.shadowRoot.querySelector('#price').value);
        this.dispatchEvent(new CustomEvent('filter-changed', {
          bubbles: true,
          composed: true,
          detail: { category, price }
        }));
      });
    });
  }
}

customElements.define('filter-bar', FilterBar);
