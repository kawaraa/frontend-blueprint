"use client";
import { useEffect, useState } from "react";
import { cardCls } from "@/ui-library/tailwind/layout";
import { btnCls } from "@/ui-library/tailwind/button";

export default function SelectLanguageDialog({ items = [], updateLang, open }) {
  const [cls, setCls] = useState("-translate-y-24");

  const changeLanguage = (lang) => {
    if (updateLang) updateLang(lang);
    setCls("-translate-y-24");
  };

  useEffect(() => {
    if (open) setCls("-translate-y-0");
  }, [open]);

  if (!open || !items[0]) return null;
  return (
    <div
      className={`${cardCls} fixed z-[100] top-2 right-1/2 translate-x-1/2 px-5 py-3 rounded-lg flex justify-center items-center transition ${cls}`}
    >
      {items.map((item, i) => (
        <button
          onChange={() => changeLanguage(item.code)}
          className={`${btnCls}  mx-1 !px-2 !py-1 flex justify-center items-center ${
            item.code == "ar" ? "font-arabic" : ""
          }`}
          key={i}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

const content = {
  h: { en: "Chose language", ar: "اختار اللغة" },
};
