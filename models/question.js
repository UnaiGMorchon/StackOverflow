import mongoose from '../utils/mongoose.js';


/**
* Define un modelo de datos en una base de datos MongoDB utilizando la biblioteca Mongoose de Node.js. 
* especifica los campos que se deben almacenar en cada documento de la colección "Question" 
* @class
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
const Question = mongoose.model("Question", QuestionSchema);

export default Question;
