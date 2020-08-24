const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./planModel');

const schema = new Schema({
    guideid : { type: String, trim: true },
    useridcomment : { type: String, trim: true  },
    useremail : { type: String, trim: true },
    avatar : { type: String , trim: true },
    author : { type: String, trim: true },
    datecomment : {type: String, trim: true },
    message : {type : String, trim: true },
},{
  collection: 'localguide_users'
});

const comment = mongoose.model('Comment', schema);

module.exports = comment;