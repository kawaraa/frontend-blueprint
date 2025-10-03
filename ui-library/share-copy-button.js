"use client";
import { useState } from "react";
import SvgIcon from "./svg-icon";
import { cardCls } from "./tailwind/layout";

export function ShareCopyButton({ lang = "en", text, shareOptions, cls = "" }) {
  const [msg, setMsg] = useState("");

  const handleClick = () => {
    if (!shareOptions) handleCopy(text);
    else {
      const url = shareOptions.path ? window.location.origin + shareOptions.path : window.location.href;
      if (navigator.share) return navigator.share({ ...shareOptions, url });
      handleClick(url);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setMsg("success");
        setTimeout(() => setMsg(""), 2000);
      })
      .catch(() => {
        setMsg("error");
        setTimeout(() => setMsg(""), 2000);
      });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={content.title[lang]}
      aria-label={content.title[lang]}
      className={`group relative w-5 cursor-pointer hover:text-orange-400 ${cls}`}
    >
      <SvgIcon name={shareOptions ? "share" : "copy"} />
      {msg && (
        <span
          className={`${cardCls} absolute ${
            msg == "error" ? "text-red-500" : "text-green-500"
          } left-1/2 -translate-x-1/2 -top-2 -translate-y-full text-xs px-2 py-1 !rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[1]`}
        >
          {content[msg]?.[lang]}
        </span>
      )}
    </button>
  );
}

const content = {
  title: { en: "Click to copy", ar: "انقر لنسخ" },
  success: { en: "Copied", ar: "تم النسخ" },
  error: { en: "Could not copy", ar: "تعذر النسخ" },
};

/** Usage:
  <ShareCopyButton text="text to copy"/>
  Or
  <ShareCopyButton shareOptions={{ title: "ALM", url: "/test" }} />
*/
