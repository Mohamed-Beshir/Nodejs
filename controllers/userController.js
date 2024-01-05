


import User from '../models/user.js';
import bcrypt from 'bcrypt';

const userController = {
    signup: async (req, res) => {
        try {
            const { userName, email, password, age, gender, phone } = req.body;

            // Check if email is unique
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already registered' });
            }

            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                userName,
                email,
                password: hashedPassword,
                age,
                gender,
                phone,
            });

            res.status(201).json({ newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the user with the provided email exists
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Check if the provided password matches the stored password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            res.status(200).json({ message: 'Signin successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    searchByNameAndAge: async (req, res) => {
        try {
            const { name, age } = req.params;
            const users = await User.find({ userName: { $regex: `^${name}`, $options: 'i' }, age: { $lt: age } });

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    searchByAgeRange: async (req, res) => {
        try {
            const { minAge, maxAge } = req.params;
            const users = await User.find({ age: { $gte: minAge, $lte: maxAge } });

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUserProfile: async (req, res) => {
        try {
          const { id } = req.params;
          const userWithPosts = await User.findById(id).populate('posts');
    
          if (!userWithPosts) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          res.status(200).json(userWithPosts);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
};

export default userController;
