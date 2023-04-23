import stackoverflowController from "../../controllers/stackoverflowController";


/**
 * Controlador de un grupo de pruebas unitarias que tienen que contener el texto concreto para que sea ok al test
 * @class
 */

/**
 * Prueba unitaria para obtener el contenido de una página de Stack Overflow
 * @async
 * @function
 * @memberof module:controllers/stackoverflowController
 * @inner
 * @param {string} query - La consulta de búsqueda a realizar en Stack Overflow
 * @throws {Error} Si ocurre algún error en la búsqueda o en la extracción de datos de la página
 * @returns {string[]} - Un objeto con la información de la página de Stack Overflow
 * @example
 * const query = "phpMyAdmin - Error > Incorrect format parameter?";
 * const { title, question, answers } = await stackoverflowController.getContent(query);
 * console.log(title);
 * // "phpMyAdmin - Error > Incorrect format parameter?"
 * console.log(question.question);
 * // "I have a WordPress production website..."
 * console.log(answers[0].answer);
 * // "This issue is not because of corrupt database but rather the PHP upload size limit..."
 */

describe ("stackoverflow controller", () => {
    
    it('Deberia conseguir el contenido de una pagina de stackoverflow', async()=> {
        const query = "phpMyAdmin - Error > Incorrect format parameter?";
        const {title,question,answers} = await stackoverflowController.getContent(query); // { lo recoge como un objeto en de de array q seria colocado en el miso orden}
        expect(title).toContain('phpMyAdmin - Error > Incorrect format parameter?'); 
        expect(question.question).toContain('I have a WordPress production website.');
        expect(question.votes).toBe(264);
        expect(question.date).toBe('Jun 4, 2018 at 23:15');
        expect(question.user).toBe('Henry');
        
        expect(answers[0].answer).toContain('This issue is not because of corrupt database but rather the PHP upload size limit');
        expect(answerVotes[0].votes).toBe(642);
        expect(answerDate[0].date).toBe('Jun 7, 2018 at 16:58');
        expect(answerUser[0].user).toBe('Pooja Mistry');
    },20000);
});

