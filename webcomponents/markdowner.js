import "https://cdnjs.cloudflare.com/ajax/libs/marked/2.1.3/marked.min.js";

class markdowner extends HTMLElement {
   _shadowRoot = null;
   _filename = "markdowner";

   constructor() {
     super();
     this._filename = this.hasAttribute('filename') ? this.getAttribute('filename') : this._filename;
     this._shadowRoot = this.attachShadow({mode: 'open'});
     this._shadowRoot.innerHTML = `
     <style>
     :host {
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 10px;
        min-height: 500px;
     }
     textarea {
       height:100%;
       padding:1%;
       font-size:100%;
       line-height:125%;
       font-family:san-serif;
       box-sizing:border-box;
     }
     textarea::selected {
       background-color: #7D7;
     }
     .preview {
       height:100%;
       padding: 1%;
     }
     </style>
     <textarea placeholder="Type markdown here, see html there">${localStorage.getItem(this._filename) || ""}</textarea>
     <div class="preview">${marked(localStorage.getItem(this._filename) || "Type markdown there, render HTML here.")}</div>
     `;

   }

   save (txt) {
     localStorage.setItem(this._filename, txt);
     this.shadowRoot.querySelector('.preview').innerHTML = marked(txt);
   }

   connectedCallback() {
     this.shadowRoot.addEventListener('input', (e) => {
        this.save(e.target.value);
     });
   }

   disconnectedCallback() {
      this.save(this._shadowRoot.querySelector('textarea').value);
   }

}
customElements.define('markdown-pad', markdowner);

