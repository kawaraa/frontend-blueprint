import { cardCls } from "@/ui-library/tailwind/layout";

export function CheckCard({ Tag = "label", children, cls, inCls, ...p }) {
  return (
    <Tag htmlFor={cls} className={`relative ${cardCls} ${cls || ""}`}>
      <input
        id={cls}
        title={p.title || p.name}
        aria-label={p.title || p.name}
        className={`absolute top-0 left-0 w-full h-full appearance-none border-pc bg-[rgb(0,0,0,0.1)] dark:bg-blur checked:bg-[transparent] dark:checked:bg-[transparent] checked:border-4 rounded-lg fs ${inCls}`}
        {...p}
      />
      {children}
    </Tag>
  );
}
