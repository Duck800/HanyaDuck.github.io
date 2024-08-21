// 在 JavaScript 文件中
class CustomHonor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
        .honor-detail {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 6px 8px 6px 8px;
        }

        .honor-level {
            color: #D6F0C6;
            font-family: 'Barlow-Black', sans-serif;
            font-size: 2rem;
        }

        .honor-name {
            color:#7CC694;
            font-family: 'Barlow-Black', sans-serif;
            font-size: 1rem;
        }
        </style>
        <div class="honor-detail">
          <b class="honor-level">${this.getAttribute('honor-level')}</b>
          <b class="honor-name">${this.getAttribute('honor-name')}</b>
        </div>
      `;
    }
}

class CustomIntern extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
        .intern-detail {
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
        }

        .intern-detail img {
            width: 20%;
            height: auto;
            margin: 10px;
        }

        .company-info {
            width:75%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        .company-name {
            color: #D6F0C6;
            font-family: 'Barlow-Black', sans-serif;
            font-size: 2rem;
        }

        .time-place {
            color: #7CC694;
            font-family: 'Barlow-Black', sans-serif;
            font-size: 1rem;
        }
        </style>
        <div class="intern-detail">
            <img src="${this.getAttribute('img-src')}" img-alt="${this.getAttribute('alt')}">
            <div class="company-info">
                <b class="company-name">${this.getAttribute('company-name')}</b>
                <b class="time-place">${this.getAttribute('time-place')}</b>
            </div>
        </div>
      `;
    }
}

customElements.define('honor-detail', CustomHonor);
customElements.define('intern-detail', CustomIntern);