"use client";
import Loader from "./loader";

export default function InfiniteScrollContainer({ Tag = "div", children, onLoadContent, loading, cls = "" }) {
  const handleScrollEvent = (e) => {
    const { scrollHeight, offsetHeight, scrollTop } = e.target;
    if (offsetHeight + scrollTop == scrollHeight) onLoadContent();
  };

  return (
    <Tag className={`overflow-auto ${cls || "max-h-[calc(100vh-150px)]"}`} onScroll={handleScrollEvent}>
      {children}

      <Loader size="40" wrapperCls="absolute inset-0" loading={loading} />
    </Tag>
  );
}

/*
Usage:

 <InfiniteScroll onLoadContent={() => console.log("Load content")}>
  .....
</InfiniteScroll>
*/
