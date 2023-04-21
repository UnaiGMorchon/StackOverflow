import mongoose from '../utils/mongoose.js';

const AnswerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    votes:{
        type: Number,
        default: 0,
    },
    user:{
        typeof: String,
        required: false,
    },
    date:{
        type: Date,
        required: false,
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },

});
const Answer = mongoose.model("Answer", AnswerSchema);

export default Answer;
