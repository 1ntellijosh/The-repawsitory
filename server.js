//******************/
// RePAWSitory Server
//******************/

//**** DEPENDENCIES ****\\
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/repawsitory';
const session = require('express-session');

//**** MIDDLEWARE ****\\
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
}));

//**** CONTROLLERS ****\\
const postController = require('./controllers/posts.js');
app.use('/posts', postController);

const userController = require('./controllers/users.js')
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//**** MONGOOSE CONNECTION ****\\
mongoose.connect(mongoUri);

//**** ROUTE SENDS LOGGED IN USER DATA TO ANGULAR ****\\\
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

//**** START SERVER LISTENER ****\\
app.listen(PORT, ()=>{
    console.log('listening...');
});

//**** CONNECT TO MONGO DB ****\\
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...');
})
