import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser {
    user {
        _id
        username
        email
        role
    }
  }
`;

//is this right?
export const GET_ALL_USERS = gql`
  query getAllUsers {[
    user {
        _id
        username
        email
        role
    }
    ]}
`;

export const GET_NOTE = gql`
    query getNote {
        note {
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

//is this right?
export const GET_ALL_NOTES = gql`
    query getAllNotes {[
    note {
            _id
            customerName
            customerContact
            user
            title
            text
            completed
         }
]}
`;