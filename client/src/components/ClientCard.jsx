import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import {DELETE_CLIENT} from "../utils/Mutations"
import {GET_CLIENTS, GET_PROJECTS} from "../utils/Queries"
import s from './container.module.css'
function ClientCard({ data }) {

const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: data.id },
    refetchQueries: [{ query: GET_CLIENTS },{ query: GET_PROJECTS }]
});
  return (
    <div className={s.cc}>
      <div>{data.name}</div>
      <div>{data.email}</div>
      <div>{data.phone}</div>
      <IconButton aria-label="delete" color="primary" onClick={deleteClient}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default ClientCard;
