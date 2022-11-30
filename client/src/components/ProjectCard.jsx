import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_PROJECT } from "../utils/Mutations";
import { GET_PROJECTS } from "../utils/Queries";
import {useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom"
import s from "./container.module.css";
import CircularProgress from '@mui/material/CircularProgress';

function ProjectCard({ data }) {
  let progress;
  if(data.status == 'In Progress'){
    progress = 50
  }
  else if(data.status == 'Completed'){
    progress = 100
  }
  else{
    progress = 0
  }
  const navigate = useNavigate()
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: data.id },
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  return (
    <div onClick={() => {
      navigate(`/project/${data.id}`)
    }} className={s.pc}>
      <h2>{data.name}</h2>
      <CircularProgress variant="determinate" value={progress}/>
    </div>
  );
}

export default ProjectCard;
