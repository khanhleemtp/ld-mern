const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
// const config = require('config');
require('dotenv').config();

const questionsRoute = require('./routes/api/questions');
const usersRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');

const app = express();
// Step-1-
const PORT = process.env.PORT || 8080; //6656

// body parser Middleware
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB config
// const db = config.get('mongoURI');


// connect db
// step-2
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Mongo db connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/questions', questionsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

// Serve static assets if in production

// step-3
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


// 
app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));