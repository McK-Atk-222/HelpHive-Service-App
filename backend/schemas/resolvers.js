import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth.js';
import User from '../models/User.js';

const resolvers = {
    // Add a user registration mutation
    Mutation: {
        register: async (_, { username, email, password, role }) => {
            const user = await User.create({ username, email, password, role });
            const token = signToken(user);
            return { token, user };
    },
    // Add a user login mutation
    login: async (_, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user || !(await user.isCorrectPassword(password))) {
            throw new AuthenticationError('Invalid credentials');
        }
        const token = signToken(user);
        return { token, user };
        },
    },
};

export default resolvers;