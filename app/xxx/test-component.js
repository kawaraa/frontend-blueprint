"use client";
import { useState } from "react";
import Tooltip from "./tooltip";

export default function TextComponent({ params, searchParams }) {
  // const [loading, setLoading] = useState(true);
  const [x, setX] = useState(true);
  return (
    <>
      <button onClick={() => setX(true)}>show</button>
      <div className="text-right w-full">
        <Tooltip position="top-left">nibcwirb ni vpjwnvp vpwbvpiw vpwjvnpw vpwijvn </Tooltip>
      </div>
    </>
  );
}
