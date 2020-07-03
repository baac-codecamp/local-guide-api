const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');

const schema = new Schema({
  //user_id: { type: String, required: true, trim: true },
  review_note: { type: String, trim: true },
  review_type: { type: String, trim: true },
  review_date: { type: String, trim: true },
  star: { type: String, trim: true },
  user : { type : Schema.Types.ObjectId, ref : User}
}, {
  collection: 'review'
});

const review = mongoose.model('Review', schema);

module.exports = review;