const express = require('express');
const bcrypt = require('bcryptjs');
// const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const router = express.Router();


const User = require('../../models/User');

router.post('/', (req, res) => {
   const { email, password } = req.body;

   // simple validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    // check for existed user
    User.findOne({ email })
        .then(user => {
            if(!user) res.status(400).json({ msg: "User does not exist"});
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});
                    jwt.sign(
                        { id: user.id },
                        process.env.jwtSecret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw(err);
                            res.json( {
                                token,
                                id: user.id,
                                name: user.name,
                                email: user.email
                            })
                        }
                    )

                })

        })
})


// @route GET api/auth/user
// @desc GET user data
// @access Private

router.get('/user', auth, (req, res) => {
        User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})


module.exports = router;