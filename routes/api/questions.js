const express = require('express');

const router = express.Router();

// Question Model

const Question = require('../../models/Question');

// @routes
// @desc GET All Items
// @access Public

router.get('/', (req, res) => {
    Question.find()
        .then(ques => res.json(ques))
        .catch(err => console.log(err)); 
});

router.post('/', (req, res) => {
    const newQuestion = new Question({
        question: req.body.question,
        category: req.body.category,
        question: req.body.question,
        difficulty: req.body.difficulty,
        correct_answer: req.body.correct_answer,
        incorrect_answers: req.body.incorrect_answers,
        date: req.body.date,
    });
    newQuestion.save().then(ques => res.json(ques));
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Question.findById(id)
            .then(item => {
                item.remove().then(() => res.json({ success: true }))
            })
            .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;