import  { User, Note }  from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';


interface Context {
    user?: User;
    note?: Note;
  }

interface AddRoleArgs {
    id: string;
    role: string;
  }
  
interface RemoveRoleArgs {
    id: string;
    role: string;
  }


const resolvers = {
Query: {
  getUser: async (_parent: any, _args: any, context: Context): Promise< User| null> => {
    if (context.user) {
      return await User.findOne({ _id: context.user._id });
    }
    throw AuthenticationError;
  },
  getNote: async (_parent: any, _args: any, context: Context): Promise< User| null> => {
    if (context.note) {
      return await Note.findOne({ _id: context.note._id });
    }
    throw AuthenticationError;
  },
    },
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  },
  getAllNotes: async () => {
    try {
      const notes = await Note.find();
      return notes;
    } catch (error) {
      throw new Error("Failed to fetch notes");
    }
  },
Mutation: {
  register: async (_, { username, email, password, roles }) => {
    const user = await User.create({ username, email, password, roles });
    const token = signToken(user);
    return { token, user };
  },
  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
    }
    const token = signToken(user);
    return { token, user };
  },
  logout: async (_, __, { context }) => {
    context.token = null;
    return true;
  },
  updateUser: async (_, { Id, username, email, password, role }, context) => {
    const updatedUser = await User.findByIdAndUpdate(
      Id,
      { username, email, password, role },
      { new: true } // Return the updated user
    );
    return updatedUser;
  },
  deleteUser: async (_, { id }, context) => {
    // Find the user and delete them
    const deletedUser = await User.findByIdAndRemove(id);
    // Check if the user was found and deleted
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  },
  createNote: async (_, { customerName, customerContact, text }, __) => {
    const newNote = await Note.create({
      customerName,
      customerContact,
      text,
      createdAt: new Date().toISOString(), // should we add timestamp?
    });
    return newNote;
  },
  updateNote: async (_, { id, customerName, customerContact, user, title, text, completed }, context) => {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { customerName, customerContact, user, title, text, completed },
      { new: true } // Return the updated note
    );
    // Check if the note was found and updated
    if (!updatedNote) {
      throw new Error('Note not found');
    }
    return updatedNote;
  },
  deleteNote: async (_, { id }, context) => {
    const deletedNote = await Note.findByIdAndRemove(id);
    // Check if the user was found and deleted
    if (!deletedNote) {
      throw new Error('Note not found');
    }
    return deletedNote;
  },
  addRole: async (_parent: unknown, { id, role }: AddRoleArgs) => {
    return await User.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: { roles: role },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  },
  removeRole: async (_parent: unknown, { id, role }: RemoveRoleArgs) => {
    return await User.findOneAndUpdate(
      { _id: id },
      { $pull: { roles: role } },
      { new: true }
    );
  },
}};

export default resolvers;