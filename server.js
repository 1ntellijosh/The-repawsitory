const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
}));

const postController = require('./controllers/posts.js');
app.use('/posts', postController);

const userController = require('./controllers/users.js')
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

mongoose.connect('mongodb://localhost:27017/repawsitory');

app.get('/', function(req, res){
    res.send('hello');
});

app.listen(3000, ()=>{
    console.log('listening...');
});

mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
})
