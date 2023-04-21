import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";


async function searchLinks(query){
    // scarper
    const scraper = new Scraper();
    await scraper.init();

    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.google.com/search?q=${encodedQuery}`;
    const html = await scraper.getPageContent(url);

    //parser
    const parser = new Parser(html);
    const links = parser.getLinks();
    scraper.close();
    return links;
}

export default {
    searchLinks
}