"use client";
import { useState } from "react";

export default function useRequestApi({ baseUrl, blockAlert }) {
  const [loading, setLoading] = useState(false);
  // const { showMessage } = useContext(StateContext);
  const defaultHeader = { "Content-Type": "application/json" };

  const handleRequest = async (endpoint, method = "GET", body, newHeaders) => {
    setLoading(true);
    try {
      if (body) body = JSON.stringify(body);
      const headers = { ...(method == "GET" ? {} : defaultHeader), ...newHeaders };
      const res = await request(`${baseUrl}/${endpoint}`, { method, body, headers });
      setLoading(false);
      return res;
    } catch (error) {
      // showMessage({ type: "error", text: error, duration: 3 });
      if (!blockAlert) alert(JSON.stringify(error.message || error.error || error));
      setLoading(false);
    }
    return;
  };

  return [handleRequest, loading, setLoading];
}

export function request() {
  return fetch(...arguments)
    .then(async (res) => {
      let data = await res.text();
      try {
        data = JSON.parse(data);
      } catch (err) {}
      if (!res.ok) throw data;
      return data;
    })
    .catch((error) => {
      throw new Error(parseError(error));
    });
}

export function parseError(value, msgs = "") {
  if (value && typeof value != "object") return msgs + value + " ";
  if (value instanceof Error && value.message) return msgs + value.message + " ";
  else if (Array.isArray(value)) value.forEach((item) => (msgs += parseError(item)));
  else Object.keys(value).forEach((k) => (msgs += parseError(value[k])));
  return msgs?.trim() || "Unknown error";
}
/* *** Usage ***
const [handleRequest, loading, setLoading] = useRequestApi({ baseUrl, blockAlert });

const data = handleRequest(endpoint, ...)
*/
