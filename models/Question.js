const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const questionSchema = new Schema({
    category: {
        type: String
    },
    difficulty: {
        type: String
    },
    question: {
        type: String
    },
    correct_answer: {
        type: String
    },
    incorrect_answers: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Question = mongoose.model('question', questionSchema);

module.exports = Question;