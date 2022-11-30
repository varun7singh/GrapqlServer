import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../utils/Queries";
import { useParams } from "react-router-dom";
import Spinner from "../assets/Spinner";
import Navbar from "./Navbar";
import s from "./container.module.css";
import { ColorButton } from "../assets/Buttons";


function ProjectDet() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });
  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <div className={s.container}>
      <Navbar />
      <div className={s.detail}>
        <h2>{data.project.name}</h2>
        <div>Desc: {data.project.description}</div>
        <div>Status: {data.project.status}</div>
        <h2>Client Details</h2>
        <div>Name: {data.project.client.name}</div>
        <div>Email: {data.project.client.email}</div>
        <div>Phone: {data.project.client.phone}</div>
        <ColorButton variant="contained">Update Details</ColorButton>
      </div>
    </div>
  );
}

export default ProjectDet;
