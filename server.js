const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/repawsitory';
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

// const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/repawsitory';

app.get('/app', function(req, res){
    if(req.session.currentUser){
        res.json(req.session.currentUser);
    } else {
        res.status(401).json({ //status 401 is specifically for when the user needs to log in
            status:401,
            message:'not logged in'
        });
    }
});

app.listen(PORT, ()=>{
    console.log('listening...');
});

mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
})
