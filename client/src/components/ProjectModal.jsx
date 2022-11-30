import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { GET_CLIENTS, GET_PROJECTS } from "../utils/Queries";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../utils/Mutations";
import { useForm } from "react-hook-form";
import { ColorButton } from "../assets/Buttons";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "@apollo/client";
import Spinner from "../assets/Spinner";
import s from "./modal.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const statuses = [
  {
    value: "new",
    label: "Not Started",
  },
  {
    value: "InProgress",
    label: "In Progress",
  },
  {
    value: "Done",
    label: "Completed",
  },
];

export default function ProjectModal({ open, onClose }) {
  const { register, handleSubmit } = useForm();
  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: [GET_PROJECTS],
  });
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("Not Started");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleChange1 = (event) => {
    setClient(event.target.value);
  };
  const submitHandler = (data) => {
    data = { ...data, status: status };
    data = { ...data, clientId: client };
    addProject({ variables: data });
    onClose();
  };
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            X
          </Button>
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
              type="text"
              {...register("name")}
            />
            <TextField
              id="outlined-basic"
              label="description"
              variant="outlined"
              type="text"
              multiline
              maxRows={4}
              {...register("description")}
            />
            <TextField
              select
              label="Select"
              value={status}
              onChange={handleChange}
              helperText="Please select Status"
            >
              {statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Select"
              value={client}
              onChange={handleChange1}
              helperText="Please select Client"
            >
              {data.clients.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <ColorButton variant="contained" type="submit">
              Add Client
            </ColorButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
