import mongoose from '../utils/mongoose.js';

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
        typeof: String,
        required: false,
    },
    date:{
        type: Date,
        required: false,
    },
});
const Question = mongoose.model("Question", QuestionSchema);

export default Question;
