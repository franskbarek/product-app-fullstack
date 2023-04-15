import React from "react";
import { Products } from "../components";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.currentUser);
  return <div>{user && <Products />}</div>;
}
