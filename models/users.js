
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  posts: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'

  }],
  comments: [String]
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
