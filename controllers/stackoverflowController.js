import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";
import googleSearchController from "./googleSearchController.js";
import Question from "../models/question.js";
import Answer from "../models/answer.js";


async function getContent(query){
    const googleLinks = await googleSearchController.searchLinks(`stackoverflow" ${query}`);
    const url = googleLinks.find((link) => link.includes("stackoverflow.com/q"))
   
    const scraper = new Scraper();
    await scraper.init();
    const html = await scraper.getPageContent(url);
    const parser = new Parser(html);

    const question = parser.getQuestion();
    const answers = parser.getAnswers()
// creas para meter las variables que nos da la question
    const questionModel = new Question({
            query,
            title,
            content: question.question, //post.post es el que tiene jon en su trabajo
            votes: question.votes, //post.puntuacion esto es lo de jon
    })

    await questionModel.save();

    answers.forEach(async (answer) => {
    const answerModel= new Answer({
        content: answer.answer,
        votes: answer.votes,
        question: questionModel._id,
    })
    await answerModel.save();
});



    scraper.close();
    return {
        question,
        answers,
 
    }


}

export default {
    getContent
}