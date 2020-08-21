const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const guideSchema = Schema({
  firstname:  { type: String, trim: true },
  lastname:  { type: String, trim: true },
  email: { type: String, trim: true, unique: true, index: true },
  usertype: { type: String, trim: true  },
  gender: { type: String, trim: true  },
  address: { type: Array},
  education: { type: String, trim: true  },
  displayname: { type: String, trim: true  },
  profilepicture: { type: String, trim: true  },
  certificate: { type: String, trim: true  },
  location: { type: Array  },
  telephone:{ type: Number , trim : true},
  title: { type: String, trim: true },
  planlist : {type: Array},
  description: { type: String, trim: true },
},{
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'localguide_users'
});

guideSchema.virtual('plans', {
  ref: 'Plan', //ลิงก์ไปที่โมเดล Comment
  localField: '_id', //_id ฟิลด์ของโมเดล Post (ไฟล์นี้)
  foreignField: 'plan' //post ฟิลด์ของโมเดล Comment (fk)
});

guideSchema.methods.encryptPassword = async (password)  => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

guideSchema.methods.comparePassword = async function (password)  {
  console.log(password);
  console.log(this.password);
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
}
  
  const guide = mongoose.model('Guide', guideSchema);
  
  module.exports = guide;