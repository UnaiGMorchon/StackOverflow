import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";

/**
* Busca en Google los enlaces relacionados a una consulta dada.
* @param {string} query - La consulta para buscar en Google.
* @returns {string[]} Una promesa que resuelve en un array de enlaces.
*/

async function searchLinks(query){
    // Crea un nuevo scraper y espera a que se inicialice.
    const scraper = new Scraper();
    await scraper.init();
    // Codifica la consulta y genera la URL de búsqueda en Google.
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.google.com/search?q=${encodedQuery}`;
    // Obtiene el contenido de la página de búsqueda de Google.
    const html = await scraper.getPageContent(url);

    // Crea un nuevo parser y obtiene los enlaces de la página.
    const parser = new Parser(html);
    const links = parser.getLinks();
    // Cierra el scraper y retorna los enlaces encontrados.
    scraper.close();
    return links;
}

export default {
    searchLinks
}