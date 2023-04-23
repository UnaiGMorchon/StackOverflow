import mongoose from '../utils/mongoose.js';


/**
* Define un modelo de datos en una base de datos MongoDB utilizando la biblioteca Mongoose de Node.js. 
* especifica los campos que se deben almacenar en cada documento de la colección "Question" 
* @class
*/


/**
 * Esquema para una pregunta
 * @typedef {Object} QuestionSchema
 * @property {string} query - Consulta de la pregunta
 * @property {string} title - Título de la pregunta
 * @property {string} content - Contenido de la pregunta
 * @property {number} votes - Número de votos de la pregunta
 * @property {string} user - Usuario que hizo la pregunta
 * @property {string} date - Fecha de la pregunta
 */

const QuestionSchema = new mongoose.Schema({
    query:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
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
});


/**
 * Modelo para una pregunta
 * @type {QuestionModel}
 */
const Question = mongoose.model("Question", QuestionSchema);

export default Question;
