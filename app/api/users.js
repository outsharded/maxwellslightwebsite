// api/users.js

import mongoose from 'mongoose';

// Connect to MongoDB using environment variables
mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/maxwellslight`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the User schema
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

// Create the User model
const UserModel = mongoose.model('User', userSchema);

// API endpoint to get all users
export default async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await UserModel.find();

    // Send the users as JSON response
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
