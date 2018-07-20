const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  type: String,
  title: String,
  species: String,
  description: String,
  image: String,
  movie: String,
  likes: Number,
  user: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'

      }],
  comments: [String]
}, {timestamps: true});

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;
