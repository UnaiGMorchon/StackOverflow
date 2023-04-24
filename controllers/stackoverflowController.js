import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";
import googleSearchController from "./googleSearchController.js";
import Question from "../models/question.js";
import Answer from "../models/answer.js";

/**
 * Obtiene el contenido de una pregunta de StackOverflow dada una búsqueda
 * @param {string} query - La búsqueda a realizar en StackOverflow
 * @returns {string[]} Un objeto que contiene la información de la pregunta y sus respuestas de la página de Stack Overflow relacionado con la consulta dada.
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
    //const linksLinked = parser.getLinksLinked();
    //const linksRelated = parser.getLinksRelated();
// Crea un modelo de pregunta para almacenar la información
    const questionModel = new Question({
            query,
            title,
            content: question.question, //
            votes: question.votes, //
            user: question.user,
            date: question.date,
    });

    await questionModel.save();
// Crea un modelo de respuesta para cada respuesta obtenida y lo guarda en la base de datos
    answers.forEach(async (answer) => {
    const answerModel= new Answer({
        question: questionModel._id,
        content: answer.answers,
        votes: answer.votes,
        date: answer.date,
        user: answer.user,
        // linksLinked: answer.linksLinked,
       //  linksRelated: answer.linksRelated,
        

        
    });
    await answerModel.save();
});



    scraper.close();
    return {
        title,
        question,
        answers,
        //linksRelated,
        // linksLinked
    }


}

export default {
    getContent
}