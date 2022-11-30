import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { ColorButton } from "../assets/Buttons";
import {useForm} from 'react-hook-form'
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../utils/Mutations";
import { GET_CLIENTS } from "../utils/Queries";
import s from "./modal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ClientModal({ open, onClose }) {
    const { register, handleSubmit } = useForm();
    const [addClient] = useMutation(ADD_CLIENT,{
        refetchQueries: [GET_CLIENTS]
    });
    const submitHandler = (data) => {
        addClient({variables: data});
        onClose();
    }
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
              label="Email"
              variant="outlined"
              required
              type="email"
                {...register("email")}
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              required
              type="tel"
                {...register("phone")}
            />
            <ColorButton variant="contained" type="submit">Add Client</ColorButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
