// models/User.js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    orders: [
      {
        address: String,
        contents: String,
        orderCreated: { type: Date, default: Date.now },
      },
    ],
});

  const User = mongoose.models.User

module.exports = User;
