import React from "react";
import s from "./navbar.module.css";
import {useNavigate} from "react-router-dom"
import { ColorButton } from "../assets/Buttons";

function Navbar() {
  const navigate = useNavigate()
  return (
    <div className={s.navbar} >
      <ColorButton variant="contained" onClick={() => {navigate('/')}} style={{position:"absolute",left:"0",margin:"1rem"}}>Home</ColorButton>
      <h1 onClick={()=> {
      navigate('/main')
    }}>Project Wala</h1>
    </div>
  );
}

export default Navbar;
