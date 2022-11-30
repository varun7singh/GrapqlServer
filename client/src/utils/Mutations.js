import { gql } from "@apollo/client";

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      name
      id
      phone
      email
    }
  }
`;

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      name
      id
      phone
      email
    }
  }`

const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String!,$status: Status, $clientId: ID!) {
    addProject(name: $name, description: $description, clientId: $clientId, status: $status) {
      id
      name
      description
      status
      client {
        name 
      }
    }
  }`

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      name
    }
  }`

const ADD_REVIEW = gql`
mutation addReview($email: String!,$suggestion: String!,$rating: Int! ){
  addReview(email: $email, suggestion: $suggestion,rating: $rating){
    id
  }
}`


export { DELETE_CLIENT,ADD_CLIENT,ADD_PROJECT,DELETE_PROJECT,ADD_REVIEW };
