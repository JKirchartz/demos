// Custom elements must extend HTMLElement

class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.textContent = "Hello, World!"
  }
}

// Custom Elements must be defined
customElements.define( 'hello-world', HelloWorld )
