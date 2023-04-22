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
     * devuelve el elemento HTML que contiene la pregunta en la página web.
     * @method
     * @returns {string} devuelve el html que contiene la pregunta
     */

getQuestionAsDOM(){
    return this.document.querySelector('.question');
}

/** 
* Devuelve la pregunta completa titulo, votos, fecha y usuario  
* @method    
* @returns {string} - la pregunta    
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
    * Devuelve el termino de busqueda de la pregunta
    * @method    
    * @returns {string} - titulo de la pregunta    
    */
    getQuestionTitle() {
        return this.document.querySelector('h1').textContent.trim(); 
    }

 /** 
    * Devuelve el numero de votos de la pregunta   
    * @method    
    * @returns {number} - votos de la pregunta    
    */
    getQuestionVote(element){
        const votes =  element.querySelector('.js-vote-count').textContent;
        return parseInt(votes);
    }
/** 
    * Devuelve fecha de creacion de la pregunta   
    * @method    
    * @returns {string} - fecha de creacion de la pregunta    
    */

    getQuestionDateTime(element){
        const date = element.querySelector(".post-signature.owner .relativetime").textContent;
        return (date);
    }
/** 
    * Devuelve el nombre del usuario que hizo de la pregunta   
    * @method    
    * @returns {string} - nombre del usuario que hizo de la pregunta    
    */

    getQuestionUser(element){
        const user = element.querySelector(".post-signature.owner .d-none").textContent;
        return (user);
    }
   

// -----------   answer  -----------
  
    /**
   * Obtiene todas las respuestas de la pagina
   * @method
   * @returns {string[]}
   */

getAnswersAsDOM(){
    return Array.from(this.document.querySelectorAll('.answer'));
}

/** 
    * Devuelve un array con todas las respuestas con toda la informacion votos, fecha y votos
    * @method    
    * @returns {string[]} - de respuestas    
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
    * Devuelve un array con las dos fecha y selecciona la segunda fecha que es la del usuario que creo la respuesta
    * @method    
    * @returns {string[]} - fecha de respuestas    
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
    * Devuelve los votos que tiene cada respuesta
    * @method    
    * @returns {string} - votos de las respuestas    
    */
    getAnswerVote(element){
        const votes =  element.querySelector('.js-vote-count').textContent;
        return parseInt(votes);
    }

/** 
    * Devuelve un array con los usuarios y selecciona el segundo que es el usuario que creo la respuesta
    * @method    
    * @returns {string[]} - fecha de respuestas    
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
* Devuelve el array de Links    
* @method  
* @returns {string[]} -Links de la página web   
*/  
    
getLinks(){   
    const links = Array.from(this.document.querySelectorAll("a"));    
   return links.map((link)=> link.href.replace(/\/$/, '')); // remove last slash
   }   




/**    
* Devuelve el array de Links de la zona linked list    
* @method  
* @returns {string[]} -Links de la página web   

getLinksLinked(){   
    const links = Array.from(this.document.querySelectorAll(".module.sidebar-linked .question-hyperlink"));    
   return links.map((link)=> {
    if(!link.includes("https")){
        return "https://stackoverflow.com" + link.href;
    }
    return link.href;
   });
}
*/  

/**    
* Devuelve el array de Links related    
* @method  
* @returns {string[]} -Links de la página web   

getLinksRelated(){   
    const links = Array.from(this.document.querySelectorAll(".module.sidebar-related .question-hyperlink"));    
    return links.map((link)=> {
        if(!link.includes("https")){
            return "https://stackoverflow.com" + link.href;
        }
        return link.href;
       });
    }*/  
}

export default Parser;
