"use client";
import { useRef, useState } from "react";
import Table from "@/ui-library/table";
import ScrollToTopBtn from "@/ui-library/scroll-to-top-btn";

export default function TextComponent({ params, searchParams }) {
  const [loading, setLoading] = useState(false);
  const allFields = useRef(Object.keys(data[0] || {}));
  const [x, setX] = useState(data);

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

      <div className="text-center w-full relative">
        <Table data={data} />
        <Table data={data} />
        <Table data={data} />
        <Table data={data} />
        <Table data={data} />
      </div>
      <ScrollToTopBtn />
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
  {
    id: "some-id-2",
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
    id: "some-id-3",
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
    id: "some-id-4",
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
    id: "some-id-5",
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
    id: "some-id-6",
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
    id: "some-id-7",
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
    id: "some-id-8",
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
