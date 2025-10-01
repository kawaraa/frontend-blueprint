import { useState } from "react";
import Avatar from "./avatar";

export const tdClass = "px-2 py-3 whitespace-nowrap";
export const trClass = "cursor-pointer border-b border-bc dark:border-lt";

export default function Table({ data, children, onSelectAll, onSelectOne, onClick, translation, ...p }) {
  if (!data?.length) return null;
  const headers = !data.length ? [] : Object.keys(data[0]);
  const [columns, setColumns] = useState(p.visibleFields || headers);
  const photo = columns.includes("photo");
  const thCls = `px-2 py-3 center ${p.hCls}`;

  return (
    <div className={`overflow-x-auto mt-5 no-srl-bar ${p.cls || ""}`}>
      <table className="table-auto w-full sticky top-0 z-[1]">
        {/* Table header */}
        <thead className="text-base font-semibold uppercase ">
          <tr>
            {headers.map((k, i) => (
              <th className={thCls} key={i}>
                {k}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody className="">
          {data.map((row, i) => (
            <tr key={i}>
              {photo && (
                <td>
                  <Avatar src={row.photo} />
                </td>
              )}
              {columns.map((field, i) => (
                <td key={i}>{(translation && translation[row[field]]) || row[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {children}
    </div>
  );
}
