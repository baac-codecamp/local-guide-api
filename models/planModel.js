const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./userModel');
const Post = require('./guideModel');

const schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  commentCounts: { type: Number, default: 0 },
  createdDate  : { type: Date, default: Date.now },
  recentComments: { type: Array },
  plan : { type : Schema.Types.ObjectId, ref : 'Guide'},
  planlist : {type: Array},
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'localguide_users'
});
// createdDate: { type: Date, default: Date.now}, 

schema.virtual('comments', {
  ref: 'Comment', //ลิงก์ไปที่โมเดล Comment
  localField: '_id', //_id ฟิลด์ของโมเดล Post (ไฟล์นี้)
  foreignField: 'post' //post ฟิลด์ของโมเดล Comment (fk)
});

const plan = mongoose.model('Plan', schema);

module.exports = plan;