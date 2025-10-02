"use client";
import { useRef, useState } from "react";
import Table, { TableColumnsSelect } from "./table";

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

      <TableColumnsSelect columns={allFields.current} onSelect={handler} selected={allFields.current} />

      <div className="text-center w-full relative">
        <Table onCheck={console.log} imgKey="image" data={x}></Table>
      </div>
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
