// 自定义 Honor 元素
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

// 自定义 Intern 元素
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

// 自定义 Education 元素
class CustomEducation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
        .edu-detail {
            position: relative;
            padding-left: 52px;
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .edu-detail::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background-color: #fff;
            border-radius: 50%;
        }
        .edu-level {
            font-family: 'Barlow-Black', sans-serif;
            font-size: 1.8rem;
            color: #D6F0C6;
        }
        .edu-description {
            font-family: 'Barlow-Black', sans-serif;
            font-size: 1.3rem;
            color: #7CC694;
        }
        </style>
        <div class="edu-detail">
          <b class="edu-level">${this.getAttribute('edu-level')}</b>
          <b class="edu-description">${this.getAttribute('edu-description')}</b>
        </div>
      `;
    }
}

// 自定义 Skill 元素
class CustomSkill extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.skillList = {
            'UI/UX': ['Figma', 'Pixso', 'Photoshop'],
            'Front<br>End': ['HTML + CSS', 'JavaScript', 'Vue'],
            'Back<br>End': ['.NET CORE', 'Django', 'Flask'],
            'Data<br>Base': ['MySql', 'DB2', 'Oracle'],
        };
        this.isExpanded = false;
        this.isShown = false; //是否鼠标点击显示
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
        .skill-detail {
            width: 100%;
            height:100%;
            background-color: #D6F0C6;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            position: relative;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .skill-name {
            color: #FFFFFF;
            font-family: 'Barlow-Black', sans-serif;
            font-size: 3.5rem;
            position: absolute;
            bottom: 0;
            right: 0;
            text-align: right;
            transition: filter 0.3s ease;
        }
        .skill-name.blurred {
            filter: blur(4px); // 应用高斯模糊
        }
        .skill-list {
            list-style-type: none;
            padding: 5px;
            margin: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            z-index: 1;
            opacity: ${this.isExpanded ? '1' : '0'};
            transition: opacity 0.3s ease;
        }
        .skill-list li {
            color: #7CC694;
            opacity: 70%;
            font-family: 'Barlow-Black', sans-serif;
            font-size: 1.5rem;
            margin-bottom: 5px; /* 设置列表项之间的垂直间距为 10 像素 */
        }
        </style>
        <div class="skill-detail">
          <b class="skill-name ${this.isExpanded ? 'blurred' : ''}">
            ${this.getAttribute('skill-name')}
          </b>
          <ul class="skill-list">
            ${this.renderSkillList(this.getAttribute('skill-name'))}
          </ul>
        </div>
      `;

        this.shadowRoot.querySelector('.skill-detail').addEventListener('mouseenter', () => {
            this.isExpanded = true;
            this.updateUI();
        });
        this.shadowRoot.querySelector('.skill-detail').addEventListener('mouseleave', () => {
            if(!this.isShown){
                this.isExpanded = false;
                this.updateUI();
            }
        });

        this.shadowRoot.querySelector('.skill-detail').addEventListener('click', () => {
            if(this.isShown)
                this.isExpanded = false;
            this.isShown = !this.isShown;
                
            this.updateUI();
        });
    }

    renderSkillList(skillName) {
        const skills = this.skillList[skillName];
        return skills.map(skill => `<li>${skill}</li>`).join('');
    }

    updateUI() {
        this.shadowRoot.querySelector('.skill-list').style.opacity = this.isExpanded ? '1' : '0';
        this.shadowRoot.querySelector('.skill-name').classList.toggle('blurred', this.isExpanded);
    }
}

customElements.define('honor-detail', CustomHonor);
customElements.define('intern-detail', CustomIntern);
customElements.define('edu-detail', CustomEducation);
customElements.define('skill-detail', CustomSkill);