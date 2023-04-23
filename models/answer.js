import mongoose from '../utils/mongoose.js';


/**
* Define un modelo de datos en una base de datos MongoDB utilizando la biblioteca Mongoose de Node.js. 
* especifica los campos que se deben almacenar en cada documento de la colección "Answers" 
* @class
*/

/**
 * Esquema de respuesta de pregunta
 * @typedef {object} AnswerSchema
 * @property {string} content - Contenido de la respuesta
 * @property {number} votes - Votos recibidos por la respuesta
 * @property {string} user - Usuario que hizo la respuesta
 * @property {string} date - Fecha de creación de la respuesta
 * @property {mongoose.Schema.Types.ObjectId} question - ID de la pregunta a la que se respondió
 */

const answerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    votes:{
        type: Number,
        default: 0,
    },
    user:{
        type: String,
        required: false,
    },
    date:{
        type: String,
        required: false,
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },

});

/**
 * Modelo de respuesta de pregunta
 * @type {AnswerModel}
 */

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
