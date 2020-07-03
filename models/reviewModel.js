const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Guide = require('./guideModel');

const schema = new Schema({
  //user_id: { type: String, required: true, trim: true },
  review_note: { type: String, trim: true },
  review_type: { type: String, trim: true },
  review_date: { type: String, trim: true },
  star: { type: String, trim: true },
  guide : { type : Schema.Types.ObjectId, ref : Guide}
}, {
  collection: 'review'
});

const review = mongoose.model('Review', schema);

module.exports = review;