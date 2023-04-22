import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";
import googleSearchController from "./googleSearchController.js";
import Question from "../models/question.js";
import Answer from "../models/answer.js";

/**
 *  Obtiene el contenido de la pagina
 * @param {string} query - query de la pagina
 * @returns {object} - objeto con los datos de la pagina
 */

async function getContent(query){
    const googleLinks = await googleSearchController.searchLinks(`stackoverflow+ ${query}`);
    const url = googleLinks.find((link) => link.includes("stackoverflow.com/question"))
    console.log(url);
    const scraper = new Scraper();
    await scraper.init();
    const html = await scraper.getPageContent(url);
    const parser = new Parser(html);
    if(!query ) query = "undefined"
    const title = parser.getQuestionTitle();
    const question = parser.getQuestion();
    const answers = parser.getAnswers()
// creas para meter las variables que nos da la question
    const questionModel = new Question({
            query,
            title,
            content: question.question, //
            votes: question.votes, //
            user: question.user,
            date: question.date,
    });

    await questionModel.save();

    answers.forEach(async (answer) => {
    const answerModel= new Answer({
        question: questionModel._id,
        content: answer.answer,
        votes: answer.votes,
        date: answer.date,
        user: answer.user,
        
    });
    await answerModel.save();
});



    scraper.close();
    return {
        title,
        question,
        answers
    }


}

export default {
    getContent
}