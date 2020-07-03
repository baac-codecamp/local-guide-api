const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./userModel');

const schema = new Schema({
  name: { type: String, required: true, trim: true },
  password: { type: String, trim: true },
  email: { type: String, default: 0 },
  phone: { type: String },
  location  : { type: Array },
  address  : { type: String },
  profilePicture: { type: String },
  reviewList : { type : Array }
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'guide'
});
// createdDate: { type: Date, default: Date.now}, 

schema.virtual('review', {
  ref: 'Review', //ลิงก์ไปที่โมเดล Review
  localField: '_id', //_id ฟิลด์ของโมเดล Guide (ไฟล์นี้)
  foreignField: 'guide' //guide ฟิลด์ของโมเดล Review (fk)
});

const guide = mongoose.model('Guide', schema);

module.exports = guide;