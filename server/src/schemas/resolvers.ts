import  { User, Note }  from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: String;
}

interface INote {
  _id: string;
  customerName: string;
  customerContact: string;
  user: string;
  title: string;
  text: string;
  completed: boolean;
}

interface Context {
    user?: IUser;
    note?: INote;
  }


const resolvers = {
Query: {
  me: async (_parent: any, _args: any, context: Context): Promise< IUser | null> => {
    if (context.user) {
      return await User.findOne({ _id: context.user._id });
    }
    throw AuthenticationError;
  },
  getUser: async (_parent: any, args: any, context: Context): Promise< IUser | null> => {
    if (context.user) {
      return await User.findOne({ _id: args._id });
    }
    throw AuthenticationError;
  },
  getNote: async (_parent: any, args: any, context: Context): Promise< INote | null> => {
    if (context.user) {
      return await Note.findOne({ _id: args._id });
    }
    throw AuthenticationError;
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
},
Mutation: {
  register: async (_:any, { username, email, password, role }:IUser) => {
    const user = await User.create({ username, email, password, role });
    const token = signToken( user._id, user.username, user.email, user.role );
    return { token, user };
  },
  login: async (_:any, { email, password }:IUser) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
    }
    const token = signToken( user._id, user.username, user.email, user.role );
    return { token, user };
  },
  logout: async (_:any, __:any, context :any) => {
    context.headers.authorization = "";
    return true;
  },
  updateUser: async (_:any, { _id, username, email, role }:IUser) => {
    if (!role) role = "Employee"
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { username, email, role },
      { new: true } // Return the updated user
    );

    return updatedUser;
  },
  deleteUser: async (_:any, { _id }:IUser) => {
    // Find the user and delete them
    const deletedUser = await User.findByIdAndDelete(_id);
    // Check if the user was found and deleted
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  },
  createNote: async (_:any, { customerName, customerContact, text }:INote, __:any) => {
    const newNote = await Note.create({
      customerName,
      customerContact,
      text,
      createdAt: new Date().toISOString(), // should we add timestamp?
    });
    return newNote;
  },
  updateNote: async (_:any, { _id, customerName, customerContact, user, title, text, completed }:INote) => {
    const updatedNote = await Note.findByIdAndUpdate(
      _id,
      { customerName, customerContact, user, title, text, completed },
      { new: true } // Return the updated note
    );
    // Check if the note was found and updated
    if (!updatedNote) {
      throw new Error('Note not found');
    }
    return updatedNote;
  },
  deleteNote: async (_:any, { _id }:INote) => {
    const deletedNote = await Note.findByIdAndDelete(_id);
    // Check if the user was found and deleted
    if (!deletedNote) {
      throw new Error('Note not found');
    }
    return deletedNote;
  },
}};

export default resolvers;