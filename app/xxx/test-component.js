"use client";
import { useState } from "react";
import Table from "./table";

export default function TextComponent({ params, searchParams }) {
  const [loading, setLoading] = useState(false);
  const [x, setX] = useState([]);
  console.log(x);

  return (
    <>
      <button onClick={() => useState(true)}>show</button>
      <div className="text-center w-full"></div>
      <div className="text-center w-full relative">
        <Table data={[{ a: "a", b: "b" }]}></Table>
      </div>
    </>
  );
}
