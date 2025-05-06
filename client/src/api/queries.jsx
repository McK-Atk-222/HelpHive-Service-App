import { gql } from '@apollo/client';

export const ME = gql`
 {
    me {
        _id
        username
        email
        role
    }
  }
`;

export const GET_USER = gql`
 {
    getUser {
        _id
        username
        email
        role
    }
  }
`;

export const GET_ALL_USERS = gql`
{
    getAllUsers {
        _id
        username
        email
        role
    }
    }
`;

export const GET_NOTE = gql`
 {
      getNote {
            _id
            customerName
            customerContact
            user
            title
            text
            completed
            createdAt
            updatedAt
         }
    }
`;

export const GET_ALL_NOTES = gql`
   {
    getAllNotes {
            _id
            customerName
            customerContact
            user
            title
            text
            completed
            createdAt
            updatedAt
         }
}
`;