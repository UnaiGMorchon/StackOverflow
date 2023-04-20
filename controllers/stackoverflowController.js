import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";
import googleSearchController from "./googleSearchController.js";



async function getContent(query){
    const googleLinks = await googleSearchController.searchLinks(`stackoverflow" ${query}`);
    const url = googleLinks.find((link) => link.includes("stackoverflow.com/q"))
   
    const scraper = new Scraper();
    await scraper.init();
    const html = await scraper.getPageContent(url);
    const parser = new Parser(html);

    const questionTitle = parser.getQuestionTitle();
    const questionVote = parser.getQuestionVote();
    const questionDate = parser.getQuestionDateTime();
    const questionUser = parser.getQuestionUser();
    const answers = parser.getAnswers()
    const answerVotes = this.getAnswerVote();
    const answerDate = this.getAnswerDateTime();  
    const answerUser = this.getAnswertUser();

    scraper.close();
    return {
        questionTitle ,
        questionVote,
        questionDate,
        questionUser,
        answers,
        answerVotes,
        answerDate,
        answerUser  
    }


}

export default {
    getContent
}