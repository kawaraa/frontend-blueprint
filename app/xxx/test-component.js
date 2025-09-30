"use client";
import { useState } from "react";

export default function TextComponent({ params, searchParams }) {
  // const [loading, setLoading] = useState(true);
  const [x, setX] = useState([]);

  console.log(x);
  return (
    <>
      <button onClick={() => setX(true)}>show</button>
      <div className="text-right w-full">jbiefbwb wefbw wblhfbwfbwbfi</div>
    </>
  );
}
