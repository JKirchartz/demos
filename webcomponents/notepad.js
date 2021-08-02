class notepad extends HTMLElement {
   _shadowRoot = null;
   _filename = "notepad";

   constructor() {
     super();
     this._filename = this.hasAttribute('filename') ? this.getAttribute('filename') : this._filename;
     this._shadowRoot = this.attachShadow({mode: 'open'});
     this._shadowRoot.innerHTML = `
     <style>
     textarea {
       height:100%;
       width:100%;
       padding:1%;
       font-size:100%;
       line-height:125%;
       font-family:san-serif;
       box-sizing:border-box;
     }
     textarea::selected {
       background-color: #7D7;
     }
     </style>
     <textarea placeholder="Type it here, see it here">${localStorage.getItem(this._filename) || ""}</textarea>
     `;

   }

   save (txt) {
     localStorage.setItem(this._filename, txt);
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
customElements.define('note-pad', notepad);
