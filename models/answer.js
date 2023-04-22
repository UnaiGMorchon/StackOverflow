import mongoose from '../utils/mongoose.js';


/**
* Define un modelo de datos en una base de datos MongoDB utilizando la biblioteca Mongoose de Node.js. 
* especifica los campos que se deben almacenar en cada documento de la colección "Answers" 
* @class
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
const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
