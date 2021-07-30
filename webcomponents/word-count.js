/*
  <word-count> component
  returns the number of words in a page or the number of minutes to read it

  attributes:

    round="N"       - round words up to the nearest N
    minutes         - if set, show minutes to read rather than words
    wpm="N"         - reading words per minute (default 200)
    locale="lg-LG"  - set a number formatting locale (default is <html> lang)

*/
class WordCount extends HTMLElement {

  // cached word count
  static words = 0;

  constructor() {

    // essential!
    super();

    // defaults
    this.locale = document.documentElement.getAttribute('lang') || 'en-US';
    this.round = 10;
    this.wpm = 200;
    this.minutes = false;

    // attach shadow root
    this.shadow = this.attachShadow({ mode: 'open' });

  }

  // component attributes
  static get observedAttributes() {
    return ['locale', 'round', 'minutes', 'wpm'];
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {

    if (oldValue === newValue) return;
    this[property] = newValue || 1;

    // update existing
    if (WordCount.words) this.updateCount();

  }

  // connect component
  connectedCallback() {
    this.updateCount();
  }


  // disconnect component
  disconnectedCallback() {
  }

  // update count message
  updateCount() {

    if (!WordCount.words) {

      // get root <main> or </body>
      let element = document.getElementsByTagName('main');
      element = element.length ? element[0] : document.body;

      // do word count
      WordCount.words = element.textContent.trim().replace(/\s+/g, ' ').split(' ').length;

    }

    // locale
    const localeNum = new Intl.NumberFormat( this.locale );

    // output word or minute count
    this.shadow.textContent = localeNum.format(
      this.minutes ?
        Math.ceil( WordCount.words / this.wpm ) :
        Math.ceil( WordCount.words / this.round ) * this.round
    );

  }

}


// register component
window.customElements.define( 'word-count', WordCount );
