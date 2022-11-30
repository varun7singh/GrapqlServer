import React from "react";
import Navbar from "./Navbar";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import s from "./container.module.css";
import Rating from "@mui/material/Rating";
import { ColorButton } from "../assets/Buttons";
import {useForm} from "react-hook-form"
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../utils/Mutations";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const data = [
  {
    key: 0,
    label: "React.js",
  },
  {
    key: 1,
    label: "Apollo Client",
  },
  {
    key: 2,
    label: "Graphql",
  },
  {
    key: 3,
    label: "Node.js",
  },
  {
    key: 4,
    label: "Express.js",
  },
  {
    key: 5,
    label: "MongoDB",
  },
];

function LearnMore() {
  const [value, setValue] = React.useState(3);
    const { register, handleSubmit, reset } = useForm();
    const [addReview] = useMutation(ADD_REVIEW)
    const submitHandler = (data) => {
        data = { ...data, rating: value };
        addReview({variables:data})
        reset()
    }
    
  return (
    <div>
      <Navbar />
      <div className={s.lm}>
        <p>
          This was a test project made to learn the basics of Graphql and Apollo
          client
        </p>
        <p>
          Please do fill out the Feedback form to let me know how I can improve
        </p>
        <p>Tech Stack used: </p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {data.map((data) => {
            return (
              <ListItem key={data.key}>
                <Chip
                  label={data.label}
                  style={{
                    color: "white",
                    fontWeight: "900",
                    backgroundColor: "#6E84D3",
                  }}
                  clickable
                />
              </ListItem>
            );
          })}
        </Box>
        <div>
          <h3 className={s.formLabel}>FeedBack Form</h3>
          <form className={s.form} onSubmit={handleSubmit(submitHandler)}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
              type="email"
                {...register("email")}
                style={{width:"250px"}}
            />
            <TextField
              id="outlined-basic"
              label="Suggestions"
              variant="outlined"
              required
              type="text"
              multiline
              maxRows={4}
                {...register("suggestion")}
                style={{width:"250px"}}
            />
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <ColorButton variant="contained" type="submit">
              Submit
            </ColorButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;
