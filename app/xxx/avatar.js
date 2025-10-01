"use client";
import SvgIcon from "./svg-icon";
import { cardCls } from "./tw/layout";

export default function Avatar({ initial, cls, ...p }) {
  let avatar = !url ? <SvgIcon name="avatar" /> : <img className="block w-full" {...p} />;
  return (
    <div className={`${cardCls} transition aspect-square w-10 flex justify-center items-center ${cls || ""}`}>
      {url || !initial ? avatar : <span className="uppercase font-semibold">{initial}</span>}
    </div>
  );
}

/* *** Usage ***
<Avatar initial="AB" src="/image.png" cls/>
*/
