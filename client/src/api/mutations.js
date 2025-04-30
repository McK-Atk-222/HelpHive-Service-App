import { gql } from '@apollo/cleint';

// Create a mutation to register a new user
export const REGISTER_USER = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $role: String!) {
        register(username: $username, email: $email, password: $password, role: $role){
            token
            user {
                _id
                username
                role
            }
        }
    }
`;

// Create a mutation to login an existing user
export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
                role
            }
        }
    }
`