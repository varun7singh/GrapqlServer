import { useState } from "react";
import { ColorButton } from "../assets/Buttons";
import Navbar from "./Navbar";
import Clients from "./Clients";
import Projects from "./Projects";
import ProjectModal from "./ProjectModal";
import ClientModal from "./ClientModal";
import s from "./main.module.css";

function Main() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  return (
    <div>
      <ProjectModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <ClientModal
        open={open1}
        onClose={() => {
          setOpen1(false);
        }}
      />
      <Navbar />
      <div className={s.control}>
        <ColorButton
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Create Project
        </ColorButton>
        <ColorButton
          variant="contained"
          onClick={() => {
            setOpen1(true);
          }}
        >
          Add Client
        </ColorButton>
      </div>
      <Clients />
      <Projects />
    </div>
  );
}

export default Main;
