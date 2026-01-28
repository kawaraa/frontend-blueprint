"use client";
import { useEffect, useState, useRef } from "react";

export default function useInfiniteScroll({ containerId, onLoadContent, setLoading, ready }) {
  const [data, setData] = useState([]);
  const totalRef = useRef(0);
  const doneRef = useRef(false);

  const updateTotal = (number) => (totalRef.current = number);

  const removeItem = (args) => {
    let copy = [...data];
    if (!Array.isArray(args) && !isNaN(+args)) copy.splice(args, 1);
    else if (Array.isArray(args)) copy = copy.filter((item) => !args.includes(item.id));
    setData(copy);
  };

  const fetchContent = async (params) => {
    setLoading(true);
    const response = await onLoadContent(params);
    const newData = response.data || response || [];
    const newTotal = response.total || newData.length || 0;

    if (newData.length == newTotal || newTotal != totalRef.current) {
      updateTotal(newTotal);
      setData(newData);
    } else {
      setData((d) => {
        if (d.length + newData.length <= totalRef.current) return d.concat(newData);
        else {
          doneRef.current = true;
          return d;
        }
      });
    }
    setLoading(false);
  };

  const handleScrollEvent = async ({ target }) => {
    const height = target.offsetHeight || window.innerHeight;
    const scrollTop = target.scrollTop || document.documentElement.scrollTop;
    const childTotalHeight = target.children[0].offsetHeight || document.documentElement.offsetHeight;
    if (height + scrollTop < childTotalHeight || doneRef.current) return;
    await fetchContent();
  };

  const findContainer = async (count) => {
    const el = document.getElementById(containerId);
    if (el) return el;
    else if (count > 10) return window;
    return await new Promise((res) => setTimeout(() => res(findContainer(count + 1)), 100));
  };

  useEffect(() => {
    const checkContainer = (container) => {
      container.removeEventListener("scroll", handleScrollEvent);
      container.addEventListener("scroll", handleScrollEvent);
      fetchContent();
    };
    findContainer(0).then(checkContainer).catch(checkContainer);
  }, []);

  return {
    data,
    total: totalRef.current,
    updateData: setData,
    updateTotal,
    removeItem,
    refresh: fetchContent,
  };
}

/* *** Usage ***
const { data, total, refresh, ... } = useInfiniteScroll({ onLoadContent: fetchProducts,setLoading });

// ready: When this is true, it calls "setLoading" then "onLoadContent" functions, then update "data"
// refresh: is used to "refresh" the data by calling "fetchContent" and pass args passed to "refresh"
*/
