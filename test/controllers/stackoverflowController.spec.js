import stackoverflowController from "../../controllers/stackoverflowController";

describe ("stackoverflow controller", () => {
    
    it('Deberia conseguir el contenido de una pagina de stackoverflow', async()=> {
        const query = "phpMyAdmin - Error > Incorrect format parameter?";
        const {question,answers} = await stackoverflowController.getContent(query); // { lo recoge como un objeto en de de array q seria colocado en el miso orden}
        expect(question.title).toContain('phpMyAdmin - Error > Incorrect format parameter?'); 
        expect(question.votes).toContain('264');
        expect(question.date).toContain('Jun 4, 2018 at 23:15');
        expect(question.user).toContain('Henry');

        expect(answers[0].answer).toContain('This issue is not because of corrupt database but rather the PHP upload size limit');
        expect(answerVotes[0].votes).toContain('642');
        expect(answerDate[0].date).toContain('Jun 7, 2018 at 16:58');
        expect(answerUser[0].user).toContain('Pooja Mistry');
    },20000);
});

