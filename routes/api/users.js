const express = require('express');
const bcrypt = require('bcryptjs');
// const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const router = express.Router();

// Question Model

const User = require('../../models/User');

router.post('/', (req, res) => {
   const { name, email, password } = req.body;

   // simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    // check for existed user
    User.findOne({ email })
        .then(user => {
            if(user) res.status(400).json({ msg: "User already exists"});
            const newUser = new User({
                name,
                email,
                password
            })

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                            .then(user => {

                                jwt.sign(
                                    { id: user.id },
                                    process.env.jwtSecret,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if(err) throw(err);
                                        res.json( {
                                            token,
                                            user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }})
                                    }
                                )
                            })
                })
            })
        })
})


module.exports = router;