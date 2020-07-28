const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const questionsRoute = require('./routes/api/questions');

const app = express();

// body parser Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo db connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/questions', questionsRoute);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on ${port}`));