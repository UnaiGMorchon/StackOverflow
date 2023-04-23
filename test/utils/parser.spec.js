import Parser from "../../utils/parser.js"; 
import fs from "fs";
/**
 * 
 * Clase para realizar el parsing de datos de una página web
 * Crea un grupo de pruebas unitarias describe es una funcion de jest que agrupa pruebas relacionadas
 * @class
 */

describe("Parser", ()  => { 
  let parser;
  /**
    * Configuración previa a las pruebas unitarias.
    *@function
    */
    beforeAll(() => {
    /**
     * Para leer el archivo HTML de prueba y la clase Parser para analizar el contenido HTML.
     * @method
     * @returns {html} - Resuelve una vez que el archivo se ha leído y se ha creado el objeto Parser.
     */
        const html = fs.readFileSync("./test/test.html", "utf8");
         parser = new Parser(html);
    }); 
// ------------------    question    ------------------

    /**
     * Test de question title, devuelve correctamente el título de la pregunta de la página web de Stack Overflow específica.
     * @method
     * @returns {sting}  El título de la pregunta actual.
     */

it ('Deberia conseguir la pregunta de la página de stack overflow', () => {
    const question = parser.getQuestionTitle();
    console.log (question); 
    expect(question).toContain("phpMyAdmin - Error > Incorrect format parameter?");
});

    /** 
    * Test de question, devuelva la pregunta en formato DOM (Document Object Model) y que el texto contenido en la pregunta contenga una cadena de texto, de la página web de Stack Overflow específica.
    * @method    
    * @returns {HTMLElement} - la pregunta actual como un objeto DOM    
    */
 it ('Deberia devolver la pregunta en formato DOM', () => {
    const question = parser.getQuestionAsDOM();
    console.log (question); 
    expect(question.innerHTML).toContain("I have a WordPress production website"); // dentro del parentisis fatlaria un teexto q contenga del hmtl dentro de la question
});

/** 
* Test de question, extrae el número de votos de una pregunta en formato DOM.
* @method    
* @param {HTMLElement} - El objeto DOM que representa la pregunta de Stack Overflow.
* @returns {number} El número de votos de la pregunta.    
*/
it ('Deberia devolver los votos de una pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const votes = parser.getQuestionVote(question);
    console.log (votes); 
    expect(votes).toBe(264); 
});


/** 
* Test de question, extrae la fecha y hora de publicación de una pregunta en formato DOM.
* @method    
* @param {HTMLElement}- El objeto DOM que representa la pregunta de Stack Overflow.
* @returns {string} La fecha y hora de publicación de la pregunta en formato "MMM D, YYYY at H:mm".  
*/
it ('Deberia devolver la fecha de la pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const date = parser.getQuestionDateTime(question);
    console.log (date); 
    expect(date).toBe("Jun 4, 2018 at 23:15"); 
});
    

/** 
* Test de question, extrae el usuario de una pregunta en formato DOM.
* @method    
* @param {HTMLElement}- El objeto DOM que representa la pregunta de Stack Overflow.
 * @returns {string} El nombre de usuario del autor de la pregunta.
*/
it ('Deberia devolver el usuario de la pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const user = parser.getQuestionUser(question); 
    console.log (user); 
    expect(user).toBe("Henry"); 
});
    


// ------------------    answer ------------------



 /** 
    * Test de answers, devuelva array de respuestas en formato DOM (Document Object Model) que representan las respuestas de una pregunta en cadena de texto, de la página web de Stack Overflow específica.
    * @method    
    * @returns {HTMLElement[]} - Un array de objetos DOM que representan las respuestas de la pregunta.  
    */
it ('Deberia devolver un array de la respuestas en formato DOM', () => {
    const answers = parser.getAnswersAsDOM();
    console.log (answers); 
    expect(answers[0].innerHTML).toContain("This issue is not because of corrupt database but rather the PHP upload size limit");
});

/** 
* Test de answers, extrae array de el número de votos de las respuestas en formato DOM.
* @method   
* @param {HTMLElement} answer - El objeto DOM que representa la respuesta de Stack Overflow. 
* @returns {Number[]} Los votos de la respuesta.   
*/
it ('Deberia devolver los votos de una respuesta', () => {
    const answer = parser.getAnswersAsDOM();
    const votes = parser.getAnswerVote(answer[0]); 
    expect(votes).toBe(642); 
});

/** 
* Test de answers, extrae array de usuarios de las respuestas en formato DOM.
* @method 
* @param {HTMLElement} answer - El objeto DOM que representa la respuesta de Stack Overflow.   
* @returns {string[]} - los usuarios que publicaron en la respuestas  
*/
it ('Deberia devolver el usuario de la respuesta', () => {
    const answer = parser.getAnswersAsDOM();
    const user = parser.getAnswerUser(answer[0]);
    expect(user).toBe("Pooja Mistry"); 
});


/** 
* Test de answers, extrae array las fechas y hora en que se publicó las respuestas en formato DOM.
* @method    
* @param {HTMLElement} answer - El objeto DOM que representa la respuesta de Stack Overflow.
* @returns {string[]} - los usuarios de la respuesta    
*/
it ('Deberia devolver la fecha de la respuesta', () => {
    const answer = parser.getAnswersAsDOM();
    const date = parser.getAnswerDateTime(answer[0]);
    console.log (answer);
    console.log (date);
    expect(date).toBe("Jun 7, 2018 at 16:58"); 
});


// -----------   links  -----------

/**
 * Obtiene los enlaces linked de la página actual en Stack Overflow.
 *
 * @returns {String[]} Una matriz de cadenas que representan los enlaces relacionados.
 */
it ('Deberia conseguir los linked de la página', () => {
    const links = parser.getLinkslinked();
    console.log (links);
    expect(links).toEqual("/questions/1263680/maximum-execution-time-in-phpmyadmin?noredirect=1");
});

/**
 * Obtiene los enlaces relacionados de la página actual en Stack Overflow.
 *
 * @returns {String[]} Una matriz de cadenas que representan los enlaces relacionados.
 */
it ('Deberia conseguir los links related de la página', () => {
    const links = parser.getLinksRelated();
    console.log (links);
    expect(links).toEqual("/questions/356578/how-can-i-output-mysql-query-results-in-csv-format");
});

    

});