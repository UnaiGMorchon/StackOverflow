import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";



async function getContent(query){
   
    const scraper = new Scraper();
    await scraper.init();
    const html = await scraper.getPageContent(url);
    const parser = new Parser(html);

    const title = parser.getTitle();
    const vote = parser.getVote();
    const answer = parser.getAnswer();

    scraper.close();
    return {
        title,
        vote,
        answer,
        
    }


}

export default {
    getContent
}