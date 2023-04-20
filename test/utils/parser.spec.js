import Parser from "../../utils/parser.js"; 
import fs from "fs";


describe("Parser", ()  => { 
  let parser;
    beforeAll(() => {
        const html = fs.readFileSync("./test/test.html", "utf8");
         parser = new Parser(html);
    }); 


    it ('Deberia conseguir la pregunta de la página de stack overflow', () => {
        const title = parser.getTitle();
        console.log (title); 
        expect(title).toBe("How can I get query string values in JavaScript?");
   });


   it ('Deberia conseguir la respuesta de las preguntas de página de stack overflow', () => {
    const answer = parser.getAnswer();
    console.log (answer); 
    expect(answer).toContain("Using Proxy() is faster than using Object.fromEntries() and better supported");
});



   it ('Deberia conseguir votos de la pregunta de stack overflow', () => {
    const vote = parser.getVote();
    console.log (vote); 
    expect(vote).toBe("2694");
    });

/* 


    it ('Deberia conseguir los links de la página', () => {
    const links = parser.getLinks();
    console.log (links);
    expect(links).toEqual(["wwww.google.com", "wwww.facebook.com"]);
    });

 */


    
    /* it ('Deberia conseguir el título de la página', () => {
         const title = parser.getTitle();
         console.log (title); // para ver q te da el test del titulo
         expect(title).toBe("Test");
    });

    it ('Deberia conseguir los links de la página', () => {
        const links = parser.getLinks();
        console.log (links);
        expect(links).toEqual(["wwww.google.com", "wwww.facebook.com"]);
    });

    it('Deberia conseguir los parrafos de la página', () => {
        const paragraphs = parser.getParagraphs();
        console.log (paragraphs);
        expect(paragraphs).toEqual(["Hello", "World"])
    });

    it('Deberia conseguir los imagenes de la página', () => {
        const images = parser.getImages();
        console.log (images);
        expect(images).toEqual(["image1.png", "image2.png"]);
    });
 */

});