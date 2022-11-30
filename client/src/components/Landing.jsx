import React from "react";
import Navbar from "./Navbar";
import { SecondaryButton, ColorButton } from "../assets/Buttons";
import s from "./Landing.module.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const nav = useNavigate();
  return (
    <div className={s.container}>
      <Navbar />
      <p style={{color:"white",fontWeight:"900",fontSize:"larger",margin:"5rem"}}>Welcome to <span style={{color:"#6E84D3"}}>Project Wala</span></p>
      <div style={{display:"flex",marginTop:"8rem",gap:"2rem"}}>
        <SecondaryButton
          variant="outlined"
          onClick={() => {
            nav("/LearnMore");
          }}
        >
          Learn More
        </SecondaryButton>
        <ColorButton
          variant="contained"
          onClick={() => {
            nav("/main");
          }}
        >
          Get Started
        </ColorButton>
      </div>
    </div>
  );
}

export default Landing;
