const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const questionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Question = mongoose.model('question', questionSchema);

module.exports = Question;