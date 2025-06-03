class FilterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          padding: 1rem 2rem;
          background-color: var(--bg-muted, #f5f5f5);
          color: var(--text-main, #1a1a1a);
          border-radius: var(--radius, 8px);
          box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.05));
        }

        label {
          display: flex;
          flex-direction: column;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-main);
        }

        select {
          margin-top: 0.3rem;
          background-color: var(--bg-main, #ffffff);
          color: var(--text-main);
          border: 1px solid #ccc;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius);
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        select:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(0, 109, 119, 0.2);
        }
      </style>

      <div class="filters">
        <label>Catégorie
          <select id="category">
            <option value="all">Tout</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Casquette Mix">Casquette Mix</option>
            <option value="Sweat Éco">Sweat Éco</option>
            <option value="iPhone 16">iPhone 16</option>
          </select>
        </label>
        <label>Prix max
          <select id="price">
            <option value="100000">100 000</option>
            <option value="50000">50 000</option>
            <option value="20000">20 000</option>
            <option value="10000">10 000</option>
            <option value="5000">5 000</option>
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
