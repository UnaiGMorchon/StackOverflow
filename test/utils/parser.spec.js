import Parser from "../../utils/parser.js"; 
import fs from "fs";
/**
 * Crea un grupo de pruebas unitarias describe es una funcion de jest que agrupa pruebas relacionadas
 * @class
 */

describe("Parser", ()  => { 
  let parser;
    beforeAll(() => {
    /**
     * para leer el archivo HTML de prueba y la clase Parser para analizar el contenido HTML.
     * @method
     */
        const html = fs.readFileSync("./test/test.html", "utf8");
         parser = new Parser(html);
    }); 
// ------------------    question    ------------------

    /**
     * Test de question title, devuelve correctamente el título de la pregunta de la página web de Stack Overflow específica.
     * @method
     * @returns {sting}
     */

it ('Deberia conseguir la pregunta de la página de stack overflow', () => {
    const question = parser.getQuestionTitle();
    console.log (question); 
    expect(question).toContain("phpMyAdmin - Error > Incorrect format parameter?");
});

    /** 
    * Test de question, devuelva la pregunta en formato DOM (Document Object Model) y que el texto contenido en la pregunta contenga cierta cadena de texto, de la página web de Stack Overflow específica.
    * @method    
    * @returns {string} - la pregunta    
    */
 it ('Deberia devolver la pregunta en formato DOM', () => {
    const question = parser.getQuestionAsDOM();
    console.log (question); 
    expect(question.innerHTML).toContain("I have a WordPress production website"); // dentro del parentisis fatlaria un teexto q contenga del hmtl dentro de la question
});

/** 
* Test de question, extrae el número de votos de una pregunta en formato DOM.
* @method    
* @returns {string} - los votos de la pregunta    
*/
it ('Deberia devolver los votos de una pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const votes = parser.getQuestionVote(question);
    console.log (votes); 
    expect(votes).toBe(264); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});


/** 
* Test de question, extrae la fecha de una pregunta en formato DOM.
* @method    
* @returns {string} - la fecha de la pregunta    
*/
it ('Deberia devolver la fecha de la pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const date = parser.getQuestionDateTime(question);
    console.log (date); 
    expect(date).toBe("Jun 4, 2018 at 23:15"); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});
    

/** 
* Test de question, extrae el usuario de una pregunta en formato DOM.
* @method    
* @returns {string} - el usuario de la pregunta    
*/
it ('Deberia devolver el usuario de la pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const user = parser.getQuestionUser(question); 
    console.log (user); 
    expect(user).toBe("Henry"); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});
    


// ------------------    answer ------------------



 /** 
    * Test de answers, devuelva array de respuestas en formato DOM (Document Object Model) y que el texto contenido en la respuesta contenga cierta cadena de texto, de la página web de Stack Overflow específica.
    * @method    
    * @returns {string[]} - la pregunta    
    */
it ('Deberia devolver un array de la respuestas en formato DOM', () => {
    const answers = parser.getAnswersAsDOM();
    console.log (answers); 
    expect(answers[0].innerHTML).toContain("This issue is not because of corrupt database but rather the PHP upload size limit");
});

/** 
* Test de answers, extrae array de el número de votos de las respuestas en formato DOM.
* @method    
* @returns {string[]} - los votos de la respuesta    
*/
it ('Deberia devolver los votos de una respuesta', () => {
    const answer = parser.getAnswersAsDOM();
    const votes = parser.getAnswerVote(answer[0]); 
    expect(votes).toBe(642); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});

/** 
* Test de answers, extrae array de usuarios de las respuestas en formato DOM.
* @method    
* @returns {string[]} - los usuarios de la respuesta    
*/
it ('Deberia devolver el usuario de la respuesta', () => {
    const answer = parser.getAnswersAsDOM();
    const user = parser.getAnswerUser(answer[0]);
    expect(user).toBe("Pooja Mistry"); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});


/** 
* Test de answers, extrae array las fechas de las respuestas en formato DOM.
* @method    
* @returns {string[]} - los usuarios de la respuesta    
*/
it ('Deberia devolver la fecha de la respuesta', () => {
    const answer = parser.getAnswersAsDOM();
    const date = parser.getAnswerDateTime(answer[0]);
    console.log (answer);
    console.log (date);
    expect(date).toBe("Jun 7, 2018 at 16:58"); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});


// -----------   links  -----------


/* it ('Deberia conseguir los linked de la página', () => {
    const links = parser.getLinkslinked();
    console.log (links);
    expect(links).toEqual("/questions/1263680/maximum-execution-time-in-phpmyadmin?noredirect=1");
});

it ('Deberia conseguir los links related de la página', () => {
    const links = parser.getLinksRelated();
    console.log (links);
    expect(links).toEqual("/questions/356578/how-can-i-output-mysql-query-results-in-csv-format");
});
 */
    

});