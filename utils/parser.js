import jsdom from 'jsdom'; // son las funciones de lo que queires sacar de la web

/**
 * Clase que se encarga de hacer el parseo de html de una pagina web
 * @class
 */

class Parser {
    /**
     * constructor de la clase 
     * @constructor
     * @param {String} html - html de la página web
     */
    constructor(html){
        /**
         * @property {string} html - html de la pagina web
         * @private
         */
        this.html = html;
        this.loadDocument();
    }
    /**
     * Carga el html en un objeto de tipo document 
     * @method
     * @private
     * @returns {void} devuelve un string vacio
     */
    loadDocument() {
        const JSDOM = jsdom.JSDOM;
        const dom = new JSDOM(this.html);
        this.document = dom.window.document;
    }

    getTitle() {
        return this.document.querySelector('h1').textContent.trim(); 
    }
    getVote() {
        return this.document.querySelector('.js-voting-container .js-vote-count ').textContent.trim();
    }
    getAnswer() {
        const paragraphs = Array.from(this.document.querySelectorAll('div.answercell p'));
        return paragraphs.map((p) => p.textContent); 
    }

}

export default Parser;