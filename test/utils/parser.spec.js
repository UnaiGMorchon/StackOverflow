import Parser from "../../utils/parser.js"; 
import fs from "fs";


describe("Parser", ()  => { 
  let parser;
    beforeAll(() => {
        const html = fs.readFileSync("./test/test.html", "utf8");
         parser = new Parser(html);
    }); 
// ------------------    question    ------------------

it ('Deberia conseguir la pregunta de la página de stack overflow', () => {
    const question = parser.getQuestionTitle();
    console.log (question); 
    expect(question).toContain("phpMyAdmin - Error > Incorrect format parameter?");
});


 it ('Deberia devolver la pregunta en formato DOM', () => {
    const question = parser.getQuestionAsDOM();
    console.log (question); 
    expect(question.innerHTML).toContain("I have a WordPress production website"); // dentro del parentisis fatlaria un teexto q contenga del hmtl dentro de la question
});


it ('Deberia devolver los votos de una pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const votes = parser.getQuestionVote(question);
    console.log (votes); 
    expect(votes).toBe(264); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});


it ('Deberia devolver la fecha de la pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const date = parser.getQuestionDateTime(question);
    console.log (date); 
    expect(date).toBe("Jun 4, 2018 at 23:15"); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});
    
it ('Deberia devolver el usuario de la pregunta', () => {
    const question = parser.getQuestionAsDOM();
    const user = parser.getQuestionUser(question); 
    console.log (user); 
    expect(user).toBe("Henry"); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});
    


// ------------------    answer ------------------

it ('Deberia devolver un array de la respuestas en formato DOM', () => {
    const answers = parser.getAnswersAsDOM();
    console.log (answers); 
    expect(answers[0].innerHTML).toContain("This issue is not because of corrupt database but rather the PHP upload size limit");
});

it ('Deberia devolver los votos de una respuesta', () => {
    const answer = parser.getAnswersAsDOM();
    const votes = parser.getAnswerVote(answer[0]); 
    console.log (answer);
    console.log (votes);
    expect(votes).toBe(642); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});


it ('Deberia devolver el usuario de la respuesta', () => {
    const answer = parser.getAnswersAsDOM();
    const user = parser.getAnswerUser(answer[0]);
    console.log (answer);
    console.log (user);
    expect(user).toBe("Pooja Mistry"); // dentro del parentisis faltaria un texto q contenga del html dentro de la question
});



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