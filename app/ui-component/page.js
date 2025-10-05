"use client";
import EmptyState from "@/ui-library/empty-state";
import SearchBox from "@/ui-library/search-box";
import Table, { TableColumnsSelect } from "@/ui-library/table";
import { useRef, useState } from "react";
const itemCls = "relative overflow-auto w-full md:w-1/2 lg:w-1/3 aspect-square ";

export default function TextComponent({ params, searchParams }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dummyData);
  const [x, setX] = useState();

  return (
    <div className="w-full relative flex flex-wrap justify-center items-center">
      <div className={itemCls}>
        <TableColumnsSelect
          columns={dataFields}
          selected={Object.keys(data[0] || {})}
          onSelect={(fields) => fetchData(fields).then((res) => setData(res.data))}
        />

        <Table data={data} imgKey="image" onCheck={console.log} onClick={console.log} onSort={console.log}>
          {/* <LoadMoreButton /> */}
        </Table>
      </div>

      <div className={itemCls + "flex justify-center items-center"}>
        <EmptyState />
      </div>
      <div className={itemCls + "flex justify-center items-center"}>
        <SearchBox />
      </div>
    </div>
  );
}

const fetchData = async (fields) => ({
  total: 100,
  data: dummyData.map((item) => {
    const newItem = {};
    fields.forEach((f) => (newItem[f] = item[f]));
    return { ...newItem, id: crypto.randomUUID() };
  }),
});

const dummyStringArray = Array(20).fill("some text");
const dummyData = Array.from({ length: 20 }, () => ({
  id: crypto.randomUUID(),
  image: "some-image.png",
  a: "awefwefwef",
  b: "bdwdwefwef",
  c: "cdwfwefwefw",
  d: "wfwwefwefwefd",
  e: "efwefweewfwefweffw",
  f: "ffwefwefefwefwefw",
  g: "gfwfwefwedwefwef",
}));

const dataFields = Object.keys(dummyData[0]);
