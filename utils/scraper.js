import puppeteer from "puppeteer";

/**
 * Clase que se encarga de hacer el scraping de datos de html de una pagina web
 * @class
 */

class Scraper {
    /**
     * @constructor
     * @property {puppeteer.Browser} browser - navegador
     */
    constructor (){
        this.browser = null;
        this.page = null;
    }
/**
     * Inicializa el navegador
     * @method
     * @returns {void}
     */
    async init(){
        this.browser = await puppeteer.launch({
            headless:true,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        this.page = await this.browser.newPage();
    }

    /** 
     * Navega a una URL y devuelve el contenido de la página.
     * @method
     * @param {string} url - La URL de la página que se va a visitar.
     * @returns {string} - Una promesa que se resuelve con el contenido de la página.
    */
    async getPageContent(url){
        await this.page.goto(url);
        return await this.page.content();
    }
    /**
     * Cierra el navegador
     * @method
     * @returns {void}
     */
    async close(){
        await this.browser.close();
    }

}
export default Scraper;
