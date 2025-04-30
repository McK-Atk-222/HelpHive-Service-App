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
`;

export const LOGOUT_USER = gql`
    mutation Logout {
        logout
    }
`;

//CHECK ROLE, NEEDS TO BE ARRAY

export const UPDATE_USER = gql`
  mutation updateUser($id: ID, $username: String, $email: String, $password: String, $role: [String]) {
    updateUser(id: $id, username: $username, email: $email, password: $password, role: $role) {
      _id
      username
      email
      password
      [role]
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
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
  mutation updateNote($id: ID!, $customerName: String, $customerContact: String, $user: String, $title: String, $text: String!, $completed: Boolean) {
    updateNote(id: $id, customerName: $customerName, customerContact: $customerContact, user: $user, title: $title, text: $text, completed: $completed) {
      id
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
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id) {
            id
            title
            content
        }
    }
`;

export const ADD_ROLE = gql`
  mutation addRole($id: ID!, $role: String!) {
    addRole(id: $id, role: $role) {
      _id
      username
      roles
    }
  }
`;

export const REMOVE_ROLE = gql`
  mutation removeRole($id: ID!, $role: String!) {
    removeRole(id: $id, role: $role) {
      _id
      username
      roles
    }
  }
`