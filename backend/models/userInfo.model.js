const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  username: { type: String, required: false, trim: true },
  useremail: {
    type: String,
    required: false,
    trim: true,
    // validate: (value) =>
    //   value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ? true : false,
  },
  userpassword: { type: String, required: false, trim: true },
  termandconditions: { type: Boolean, required: false },
});

const UserInfoModel = mongoose.model('userInfo',userInfoSchema)

module.exports = UserInfoModel;
