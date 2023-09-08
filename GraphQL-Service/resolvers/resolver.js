const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { JWT_LIFETIME, JWT_SECRET } = require('../utils/constant');

const resolvers = {
  Query: {
    Users: () => {
      return User.findAll();
    },
  },
  Mutation: {
    signup: async (_, {registerInput: {username, email, password, confirm_pass} }) => {

      if (!username || !email || !password || !confirm_pass) {
        throw new Error("Please all the required fields");
      }

      if (password !== confirm_pass) {
        throw new Error("Passwords do not match");
      }

        const emailAlreadyExists = await User.findOne({ email });
        if (emailAlreadyExists) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign(
            { user_id: newUser._id, email, username },
            JWT_SECRET,
            {
              expiresIn: JWT_LIFETIME,
            }
        );
        return { ...newUser, token }
    },

    login: async (_, { loginInput: {email, password} }) => {
      // Implement your login resolver here
        if (!(email || password)) {
            throw new Error('Provide email and password');
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid Credentials');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Incorrect password');
        }

        const token = jwt.sign(
            { user_id: user._id, email: user.email, username: user.username },
            JWT_SECRET,
            {
              expiresIn: JWT_LIFETIME,
            }
        );
        return { ...user, token }
    },
  },
};

module.exports = resolvers;
