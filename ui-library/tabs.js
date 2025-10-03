"use client";
import { useEffect, useRef, useState } from "react";
import { borderCls } from "./tailwind/layout";
const tabCls = "relative flex-1 sm:flex-none text-center py-3 px-1 mx-1 sm:mx-6 cursor-pointer";

export default function Tabs({ tabs, current, onTabChange, header, translations = {}, cls = "", ...p }) {
  const container = useRef(null);
  const [bar, setBar] = useState([0, 0]);
  let activeTabIndex = tabs.findIndex((t) => {
    return (
      t.path == current ||
      t.name == current ||
      t == current ||
      t.path?.includes(current) ||
      t.name?.includes(current) ||
      (t.includes && t.includes(current))
    );
  });

  const getTabName = (tab) => translations[tab.name] || translations[tab] || tab.name || tab;

  const handleBarChange = ({ target: { offsetLeft, offsetWidth } }, index) => {
    setBar([offsetLeft, offsetWidth]);
    if (onTabChange) onTabChange(index);
  };

  useEffect(() => {
    if (container.current) {
      if (activeTabIndex < 0) setBar([0, 0]);
      else {
        const el = container.current.children[activeTabIndex];
        setBar([el.offsetLeft, el.offsetWidth]);
      }
    }
  }, [current]);

  return (
    <div className={`${borderCls} p-5 rounded-lg ${cls}`}>
      {header && header}

      {/* flex-auto col-span-full xl:col-span-6  */}

      <div
        ref={container}
        className="relative flex justify-between sm:justify-start border-b-1 border-neutral-200 dark:border-neutral-700"
      >
        {tabs.map((tab, i) =>
          tab.path ? (
            <a
              onClick={(e) => handleBarChange(e, i)}
              href={tab.path}
              alt={tab.name || tab.path}
              role="tab"
              className={`${tabCls} ${i == activeTabIndex && "text-blue-500"}`}
              key={i}
            >
              {getTabName(tab)}
            </a>
          ) : (
            <span
              onClick={(e) => handleBarChange(e, i)}
              role="tab"
              className={`${tabCls} ${i == activeTabIndex && "text-blue-500"}`}
              key={i}
            >
              {getTabName(tab)}
            </span>
          )
        )}

        <div
          style={{ left: `${bar[0]}px`, width: `${bar[1]}px` }}
          className={`absolute -bottom-[1px] h-[2px] bg-blue-500 duration-300`}
        ></div>
      </div>

      {p.children && <div className="mt-3 md:mt-6">{p.children}</div>}
    </div>
  );
}
