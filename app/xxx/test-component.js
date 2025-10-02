"use client";
import { useRef, useState } from "react";

export default function TextComponent({ params, searchParams }) {
  const [loading, setLoading] = useState(false);
  const allFields = useRef(Object.keys(data[0] || {}));
  const [x, setX] = useState(data);
  console.log(x);

  const handler = (checkedItems) => {
    console.log(checkedItems);

    setX(
      data.map((item) => {
        const newItem = {};
        checkedItems.forEach((k) => (newItem[k] = item[k]));
        return newItem;
      })
    );
  };

  return (
    <>
      <button onClick={() => useState(true)}>show</button>
      <div className="text-center w-full"></div>

      <div className="text-center w-full relative"></div>
    </>
  );
}

const data = [
  {
    id: "some-id",
    image: "some-image.png",
    a: "awefwefwef",
    b: "bdwdwefwef",
    c: "cdwfwefwefw",
    d: "wfwwefwefwefd",
    e: "efwefweewfwefweffw",
    f: "ffwefwefefwefwefw",
    g: "gfwfwefwedwefwef",
  },
  {
    id: "some-id-1",
    image: "some-image.png",
    a: "awefwefwef",
    b: "bdwdwefwef",
    c: "cdwfwefwefw",
    d: "wfwwefwefwefd",
    e: "efwefweewfwefweffw",
    f: "ffwefwefefwefwefw",
    g: "gfwfwefwedwefwef",
  },
];
