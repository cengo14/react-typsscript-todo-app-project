import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

type Props = {
  notes: Note[];
};

const Layout = ({ notes }: Props) => {
  const { id } = useParams();
  const found = notes.find((note) => note.id === id);

  if (!found) return <Navigate to={"/"} replace />;
  return <Outlet context={found} />;
};

export default Layout;
