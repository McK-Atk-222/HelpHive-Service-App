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
        username: String!
        email: String!
        role: String!
    }
    
    type Mutation {
        register(username: String!, email: String!, password: String!, role: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

export default typeDefs