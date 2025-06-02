// components/theme-toggle.js

class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background-color: white;
          color: var(--color-océan, #006d77);
          border: 2px solid white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        button:hover {
          background-color: var(--color-coco, #e29578);
          color: white;
          border-color: var(--color-coco, #e29578);
        }
      </style>
      <button id="toggle">🌗 Thème</button>
    `;
  }

  connectedCallback() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    }

    this.shadowRoot.querySelector('#toggle').addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

customElements.define('theme-toggle', ThemeToggle);
