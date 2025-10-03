"use client";
import { useRef, useState } from "react";

export default function TextComponent({ params, searchParams }) {
  const [loading, setLoading] = useState(false);
  const [x, setX] = useState();

  return (
    <>
      <button onClick={() => useState(true)}>show</button>
      <div className="text-center w-full"></div>

      <div className="text-center w-full relative"></div>
    </>
  );
}

const fetchData = async () => ({
  data: dummyData.map((item) => ({ ...item, id: crypto.randomUUID() })),
  total: 100,
});

const dummyData = Array(20).fill({
  id: crypto.randomUUID(),
  image: "some-image.png",
  a: "awefwefwef",
  b: "bdwdwefwef",
  c: "cdwfwefwefw",
  d: "wfwwefwefwefd",
  e: "efwefweewfwefweffw",
  f: "ffwefwefefwefwefw",
  g: "gfwfwefwedwefwef",
});
