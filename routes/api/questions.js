const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');

// Question Model

const Question = require('../../models/Question');

// @route GET api/questions
// @desc GET All Questions
// @access Public

router.get('/', (req, res) => {
    Question.find()
        .sort({ date: -1 })
        .then(ques => res.json(ques))
        .catch(err => console.log(err)); 
});

// @route POST api/questions
// @desc Create An Questions
// @access Private

router.post('/', auth, (req, res) => {
    const newQuestion = new Question({
        name: req.body.name
    });
    newQuestion.save().then(ques => res.json(ques));
})

router.delete('/:id', auth, (req, res) => {
    const id = req.params.id;
    Question.findById(id)
            .then(item => {
                item.remove().then(() => res.json({ success: true }))
            })
            .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;