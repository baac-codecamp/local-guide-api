const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./userModel');

const schema = new Schema({
  name: { type: String, required: true, trim: true },
  password: { type: String, trim: true },
  email: { type: String, default: 0 },
  phone: { type: String },
  address  : { type: String },
  profilePicture: { type: String },
  reviewList : { type : Array }
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'user'
});
// createdDate: { type: Date, default: Date.now}, 

schema.virtual('review', {
  ref: 'Review', //ลิงก์ไปที่โมเดล Review
  localField: '_id', //_id ฟิลด์ของโมเดล User (ไฟล์นี้)
  foreignField: 'user' //user ฟิลด์ของโมเดล Review (fk)
});

const user = mongoose.model('User', schema);

module.exports = user;