import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../utils/Queries";
import ProjectCard from "./ProjectCard";
import Spinner from "../assets/Spinner";
import s from "./container.module.css";

function Projects(props) {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;
  return (
    <div className={s.con1}>
      {data.projects.map((project) => {
        return <ProjectCard key={project.id} data={project} />;
      })}
    </div>
  );
}

export default Projects;
