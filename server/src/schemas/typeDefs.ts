// Import gql to write GraphQL schema
import { gql } from 'apollo-server-express';

// Add Auth type to return a token and user info, User type and mutations for registration and login
const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
        
    type User {
        _id: ID!
        username: String
        email: String
        role: String
    }

    type Note {
        _id: String!
        customerName: String
        customerContact: String
        user: String
        title: String
        text: String
        completed: Boolean
        createdAt: String
        updatedAt: String
    }

    type Query {
        me: User
        getUser(_id:ID!): User
        getNote(_id:ID!): Note
        getAllUsers: [User]
        getAllNotes: [Note]
    }
    
    type Mutation {
        register(username: String!, email: String!, password: String!, role: String): Auth
        login(email: String!, password: String!): Auth
        logout: Boolean
        updateUser(_id: ID!, username: String, email: String, role: String): User
        deleteUser(_id: ID!): User
        createNote(customerName: String!, customerContact: String!, text: String!): Note
        updateNote(_id: ID!, customerName: String, customerContact: String, user: String, title: String, text: String, completed: Boolean): Note
        deleteNote(_id: ID!): Note
    }
`;

export default typeDefs