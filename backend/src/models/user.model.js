const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select : false
  },

  userName: {
    type: String,
    required: true,
    unique: true,
  },
  pushSubscriptions: [
    {
      endpoint: { type: String, required: true },
      keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true },
      },
    },
  ],
});

const userModel = mongoose.model("user",userSchema);

module.exports = userModel

