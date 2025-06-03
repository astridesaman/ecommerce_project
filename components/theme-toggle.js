class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.button = document.createElement('button');
    this.button.setAttribute('aria-label', 'Changer de thème');
    this.button.setAttribute('title', 'Changer de thème');
    this.button.setAttribute('aria-live', 'polite');
    this.button.textContent = '🌙';

    const style = document.createElement('style');
    style.textContent = `
      button {
        all: unset;
        cursor: pointer;
        background-color: var(--bg-muted, #eaeaea);
        color: var(--text-main, #1a1a1a);
        padding: 0.5rem;
        border-radius: 50%;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        transition: background-color 0.3s ease, transform 0.2s ease;
      }

      button:hover {
        background-color: rgba(0, 0, 0, 0.05);
        transform: scale(1.05);
      }

      button:focus {
        outline: 2px solid var(--accent, #555);
        outline-offset: 2px;
      }
    `;

    this.shadowRoot.append(style, this.button);
  }

  connectedCallback() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      this.button.textContent = '☀️';
    }

    this.button.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      this.button.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

customElements.define('theme-toggle', ThemeToggle);
