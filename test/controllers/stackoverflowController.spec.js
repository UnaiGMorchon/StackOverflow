import stackoverflowController from "../../controllers/stackoverflowController";


/**
 * Controlador de un grupo de pruebas unitarias que tienen qu contener el texto concreto para que sea ok al test
 * @class
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

