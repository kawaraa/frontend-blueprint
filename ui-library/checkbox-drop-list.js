"use client";
import { useState } from "react";
import Transition from "./transition";
import SvgIcon from "./svg-icon";
import { inputCls } from "./tailwind/input";
import { cardCls } from "./tailwind/layout";

export default function CheckboxDropList({ name, title, items, translate, children, ...p }) {
  const [showList, setShowList] = useState(false);
  const [options, setOptions] = useState(items || []);
  const handleTranslation = (text) => (typeof translate == "function" ? translate(text) : text);

  const handelChange = ({ target }) => {
    setOptions(
      options.map((option) => {
        if (target.value == (option.key || option)) option.checked = target.checked;
        return option;
      })
    );
  };

  return (
    <div className={`relative w-48 ${p.cls || ""}`}>
      <button
        onClick={() => setShowList((x) => !x)}
        dir="ltr"
        type="button"
        className={`${inputCls} flex justify-between cursor-pointer ${p.inCls || ""}`}
        aria-controls="combobox-list"
        aria-haspopup="true"
        aria-expanded={showList}
      >
        {handleTranslation(title)}
        <span className="w-5 min-w-5 flex items-center ">
          <SvgIcon name="chevronsUpDown" />
        </span>
      </button>

      <Transition
        Tag="ul"
        open={showList}
        base={`${cardCls} absolute z-[2] mt-1 max-h-60 w-full overflow-auto rounded-md !p-1 focus:outline-none `}
        exit="opacity-0"
        time="100"
        role="listbox"
      >
        {options.map((option, i) => (
          <li className="flex items-center select-none text-gray-900" key={i}>
            <label
              dir="ltr"
              tabIndex="0"
              role="option"
              aria-selected={!!option.checked}
              className="whitespace-nowrap flex items-center w-full cursor-pointer select-none py-2 px-3"
            >
              <input
                type="checkbox"
                name={`${name}[]`}
                onChange={handelChange}
                checked={!!option.checked}
                value={option.key || option}
                tabIndex="-1"
                className="appearance-none peer"
              />

              <span className="opacity-0 peer-checked:opacity-100 h-5 w-5 min-w-5 flex items-center text-teal-600">
                {<SvgIcon name="checkMark" />}
              </span>
              <span className="w-1"></span>
              {handleTranslation(option.label || option)}
            </label>
          </li>
        ))}

        {children}
      </Transition>
    </div>
  );
}
