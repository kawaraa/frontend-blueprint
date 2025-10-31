import { borderCls } from "@/ui-library/tailwind/layout";

export function CheckCard({ Tag = "label", children, cls, inCls, ...p }) {
  return (
    <Tag htmlFor={cls} className={`relative ${borderCls} ${cls || ""}`}>
      <input
        id={cls}
        title={p.title || p.name}
        aria-label={p.title || p.name}
        className={`absolute top-0 left-0 w-full h-full appearance-none cursor-[inherit] checked:border-4 `}
        {...p}
      />
      {children}
    </Tag>
  );
}
