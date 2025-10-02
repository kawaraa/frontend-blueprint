"use client";
import { useEffect, useState } from "react";
import SvgIcon from "./svg-icon";

export default function ScrollToTopBtn({ cls = "" }) {
  let [visible, setVisible] = useState(false);

  const handleScrollEvent = () => {
    if (document.documentElement.scrollTop > 2000) setVisible(true);
    else setVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return !visible ? null : (
    <button
      onClick={() => window.scroll(0, 0) + setTimeout(() => setVisible(false), 400)}
      className={`w-14 fixed bottom-5 right-1/2 translate-x-1/2 p-2 cursor-pointer rounded-full 
        ${cls || "hover:text-blue-400"}`}
    >
      <SvgIcon name="chevronUpInCircle" />
    </button>
  );
}
