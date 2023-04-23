import jsdom from 'jsdom'; // son las funciones de lo que queires sacar de la web

/**
 * Clase que se encarga de hacer el parseo de html de una pagina web
 * @class
 */

class Parser {
    /**
     * constructor de la clase 
     * @constructor
     * @param {String} html - html de la página web
     */
    constructor(html){
        /**
         * @property {string} html - html de la pagina web
         * @private
         */
        this.html = html;
        this.loadDocument();
    }
    /**
     * Carga el html en un objeto de tipo document 
     * @method
     * @private
     * @returns {void} devuelve un string vacio
     */
    loadDocument() {
        const JSDOM = jsdom.JSDOM;
        const dom = new JSDOM(this.html);
        this.document = dom.window.document;
    }
// -----------   question    -----------


/**
     * Devuelve el elemento HTML que contiene la pregunta en la página web como objeto en fromato DOM.
     * @method
     * @returns {Element} Un objeto DOM con el contenido de la pregunta.
     */

getQuestionAsDOM(){
    return this.document.querySelector('.question');
}

/** 
* Devuelve un objeto con informacion de la pregunta completa titulo, votos, fecha y usuario en formato HTML. 
* @method    
* @returns {Object} - la pregunta
 *   @property {string} title - El título de la pregunta.
 *   @property {string} question - El contenido de la pregunta en formato HTML.
 *   @property {number} votes - El número de votos de la pregunta.
 *   @property {Date} date - La fecha y hora en que se hizo la pregunta.
 *   @property {string} user - El nombre de usuario que hizo la pregunta.    
*/
getQuestion(){
    const question = this.getQuestionAsDOM();
    const title = this.getQuestionTitle(question);
    const votes = this.getQuestionVote(question);
    const date = this.getQuestionDateTime(question);
    const user = this.getQuestionUser(question);
    return {
        title,
        question: question.outerHTML,
        votes,
        date,
        user
    }
}


/** 
    * Devuelve el termino de busqueda de la pregunta (el título de la pregunta).
    * @method    
    * @returns {string} - titulo de la pregunta como una cadena de texto   
    */
    getQuestionTitle() {
        return this.document.querySelector('h1').textContent.trim(); 
    }

 /** 
    * Devuelve el numero de votos de la pregunta   
    * @method    
    * @param {Element} element - El elemento DOM que contiene la pregunta.
    * @returns {number} El número de votos de la pregunta como un número entero.   
    */
    getQuestionVote(element){
        const votes =  element.querySelector('.js-vote-count').textContent;
        return parseInt(votes);
    }
/** 
    * Devuelve la fecha y hora en que se hizo la pregunta   
    * @method     
    * @param {Element} element - El elemento DOM que contiene la pregunta.
    * @returns {string} La fecha y hora en que se hizo la pregunta como una cadena de texto.
    */

    getQuestionDateTime(element){
        const date = element.querySelector(".post-signature.owner .relativetime").textContent;
        return (date);
    }
/** 
    * Devuelve el nombre del usuario que hizo de la pregunta   
    * @method    
    * @param {Element} element - El elemento DOM que contiene la pregunta.
    * @returns {string} El nombre del usuario que hizo la pregunta como una cadena de texto. 
    */

    getQuestionUser(element){
        const user = element.querySelector(".post-signature.owner .d-none").textContent;
        return (user);
    }
   

// -----------   answer  -----------
  
    /**
   * Devuelve un array con todos los elementos DOM que contienen las respuestas a la pregunta.
 * @method
 * @returns {Element[]} Un array con todos los elementos DOM que contienen las respuestas a la pregunta.
 */

getAnswersAsDOM(){
    return Array.from(this.document.querySelectorAll('.answer'));
}

/** 
    * Devuelve un array con objetos que contienen información sobre cada respuesta a la pregunta, incluyendo el contenido de la respuesta, el número de votos, la fecha y hora en que se hizo, y el usuario que la hizo.
     * @method    
     @returns {Object[]} Un array con objetos que contienen información sobre cada respuesta a la pregunta.    
    */
getAnswers(){
    const answers = this.getAnswersAsDOM();
    return answers.map((answer) => {
        const votes = this.getAnswerVote(answer);
        const date = this.getAnswerDateTime(answer);  
        const user = this.getAnswerUser(answer);
        return {
            answers: answer.outerHTML,
            votes,
            date,
            user
        }
    });
}


/** 
    * Devuelve la fecha y hora en que se hizo la respuesta.
    *
    * Si hay varias fechas en la respuesta (por ejemplo, si se editó), devuelve la más reciente.
    *
    * Si no hay ninguna fecha disponible, devuelve una cadena vacía.
    * @method    
    * @param {Element} element - El elemento DOM que contiene la respuesta.
    * @returns {string[]} La fecha y hora en que se hizo la respuesta como una cadena de texto.  
    */
    getAnswerDateTime(element){
        const dates = Array.from(element.querySelectorAll(".user-info.user-hover .relativetime"));
        if (dates.length === 0)
            return "";
        if(dates.length === 1) {
        return dates[0].textContent;
        }
        return dates[dates.length -1].textContent;
    }

/** 
    * Devuelve el número de votos que tiene la respuesta.
    * @method    
    * @param {Element} element - El elemento DOM que contiene la respuesta.
    * @returns {number} El número de votos que tiene la respuesta.  
    */
    getAnswerVote(element){
        const votes =  element.querySelector('.js-vote-count').textContent;
        return parseInt(votes);
    }

/** 
    * Devuelve el nombre de usuario del autor de la respuesta.
    *
    * Si hay varios nombres de usuario en la respuesta (por ejemplo, si se editó), devuelve el más reciente.
    *
    * Si no hay ningún nombre de usuario disponible, devuelve una cadena vacía.
    * @method
    * @param {Element} element - El elemento DOM que contiene la respuesta.
    * @returns {string[]} El nombre de usuario del autor de la respuesta como una cadena de texto. 
    */

    getAnswerUser(element){
        const users = Array.from(element.querySelectorAll(".post-signature .d-none"));
        if (users.length === 0)
            return "";
        if(users.length === 1) {
        return users[0].textContent;
        }
        return users[users.length -1].textContent;
    }

    

// -----------   links  -----------
   

/**    
* Devuelve una lista de enlaces (URL) presentes en el documento.
*    
* @method  
* @returns {string[]} Una lista de enlaces (URL) como cadenas de texto.
*/
    
getLinks(){   
    const links = Array.from(this.document.querySelectorAll("a"));    
   return links.map((link)=> link.href.replace(/\/$/, '')); // remove last slash
   }   




/**    
* Devuelve una lista de enlaces (URL) a preguntas relacionadas presentes en la barra lateral.
 *
 * Si una URL no incluye el prefijo "https", se agrega el prefijo "https://stackoverflow.com".
 *
 * @method
 * @returns {string[]} Una lista de enlaces (URL) como cadenas de texto.
 */
getLinksLinked(){   
    const links = Array.from(this.document.querySelectorAll(".module.sidebar-linked .question-hyperlink"));    
   return links.map((link)=> {
    if(!link.href.includes("https")){
        return  "https://stackoverflow.com" + link.href;
    }
    return link.href;
   });
} 

/**    
* Obtiene los enlaces relacionados de la página actual y los devuelve como un array de strings.
 * Si los enlaces no incluyen "https", se les añade el prefijo "https://stackoverflow.com".
 * @method
 * @returns {string[]} - Array con los enlaces relacionados.
 */   
getLinksRelated(){   
    const links = Array.from(this.document.querySelectorAll(".module.sidebar-related .question-hyperlink"));    
    return links.map((link)=> {
        if(!link.href.includes("https")){
            return "https://stackoverflow.com" + link.href;
        }
        return link.href;
       });
    }
}

export default Parser;
