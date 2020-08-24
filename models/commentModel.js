const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./planModel');

const schema = new Schema({
    guideid : { type: String},
    useridcomment : { type: String },
    useremail : { type: String,},
    avatar : { type: String },
    author : { type: String,},
    datetime : {type: Date, default: Date.now},
    content : {type : String},
},{
  collection: 'localguide_users'
});

const comment = mongoose.model('Comment', schema);

module.exports = comment;