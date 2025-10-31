"use client";
import { useEffect, useState } from "react";
import { CheckCard } from "./input";
import { cardCls } from "@/ui-library/tailwind/layout";

export default function SelectLanguageDialog({ updateLang, open }) {
  const [cls, setCls] = useState("-translate-y-24");

  const changeLanguage = (lang) => {
    if (updateLang) updateLang(lang);
    setCls("-translate-y-24");
  };

  useEffect(() => {
    if (open) setTimeout(() => setCls("-translate-y-0"), 1500);
  }, []);

  // console.log("xxxx", open);

  if (!open) return null;
  return (
    <div
      className={`${cardCls} fixed z-[100] top-2 right-1/2 translate-x-1/2 px-5 py-3 rounded-lg flex justify-center items-center transition ${cls}`}
    >
      <CheckCard
        type="radio"
        name="language"
        onChange={() => changeLanguage("en")}
        cls="w-28 !h-10 mx-1 flex justify-center items-center text-lg"
      >
        English
      </CheckCard>
      <CheckCard
        type="radio"
        name="language"
        onChange={() => changeLanguage("ar")}
        cls="w-28 !h-10 mx-1 flex justify-center items-center text-lg font-arabic"
      >
        العربية
      </CheckCard>
    </div>
  );
}

const content = {
  h: { en: "Chose language", ar: "اختار اللغة" },
};
