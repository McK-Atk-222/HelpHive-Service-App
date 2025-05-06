import { gql } from '@apollo/client';

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
`;

export const LOGOUT_USER = gql`
    mutation Logout {
        logout
    }
`;

//CHECK ROLE, NEEDS TO BE ARRAY

export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $username: String, $email: String, $role: String) {
    updateUser(_id: $_id, username: $username, email: $email, role: $role) {
      _id
      username
      email
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
      username
      email
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation createNote($customerName: String!, $customerContact: String!, $text: String!) {
    createNote(customerName: $customerName, customerContact: $customerContact, text: $text) {
      customerName
      customerContact
      text
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote($_id: ID!, $customerName: String, $customerContact: String, $user: String, $title: String, $text: String!, $completed: Boolean) {
    updateNote(_id: $_id, customerName: $customerName, customerContact: $customerContact, user: $user, title: $title, text: $text, completed: $completed) {
      _id
      customerName
      customerContact
      user
      title
      text
      completed
    }
  }
`;

export const DELETE_NOTE = gql`
    mutation deleteNote($_id: ID!) {
        deleteNote(_id: $_id) {
            _id
            title
            content
        }
    }
`