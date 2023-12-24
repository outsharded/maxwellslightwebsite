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

// API endpoint to create a new user
export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { name, email, address } = req.body;

      // Validate input (modify or remove validation based on your needs)
      if (!name || !address) {
        return res.status(400).json({ error: 'Invalid input data' });
      }

      // Create a new user with an empty order array
      const newUser = new UserModel({
        name,
        email,
        address,
        orders: [],
      });

      // Save the new user to the database
      await newUser.save();

      // Send the created user as JSON response
      res.status(201).json(newUser);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
