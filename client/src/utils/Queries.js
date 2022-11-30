import {gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query getProjects {
    projects {
        name
        description
        status
        id
    }
  }`

const GET_CLIENTS = gql`
  query getClients {
    clients {
        name
        email
        phone
        id
    }
  }`

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
        name
        description
        status
        client{
            name
            email
            phone
        }
    }
  }`

export {GET_PROJECTS,GET_CLIENTS,GET_PROJECT};