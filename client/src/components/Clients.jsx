import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../utils/Queries";
import Spinner from "../assets/Spinner";
import ClientCard from "./ClientCard";
import s from "./container.module.css";


function Clients(props) {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;
  return (
    <div className={s.con}>
      {data.clients.map((client) => {
        return <ClientCard key={client.id} data={client} />;
      })}
    </div>
  );
}

export default Clients;
