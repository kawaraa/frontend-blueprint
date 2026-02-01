"use client";
import { useState } from "react";
import config from "../config.json";
const credentials = process.env.NEXT_PUBLIC_WITH_CREDENTIALS || process.env.WITH_CREDENTIALS;

export function getURL(key) {
  return !config[key] ? key : config.apiHost + config[key];
}

export default function useApiRequest({ endpoint, setLoading, blockAlert = [], defaultData, dataFormatter }) {
  const [data, setData] = useState(defaultData || []);
  const [total, setTotal] = useState(0);

  const request = async (query, method = "GET", body, page = 1) => {
    const alert = !blockAlert.includes(method);
    if (setLoading) setLoading(true);
    try {
      if (query) body = { body, query: query };
      const res = await apiRequest(endpoint, method, body);
      if (setLoading) setLoading(false);
      let newData = res.data || res;
      if (dataFormatter) newData = dataFormatter(res);

      if (page > 1) setData(data.concat(newData));
      else if (newData) {
        setData(newData);
        setTotal(res.total || newData.length || 0);
      }

      if (method != "GET" && alert) alert("Done");
      return res;
    } catch (error) {
      // Error translation: translateError(error.message, lang)
      if (alert) alert(JSON.stringify(error.message || error.error || error));
    }
    if (setLoading) setLoading(false);
    return;
  };

  return [request, data, total, setData, setTotal];
}

export async function apiRequest(url, method = "GET", data, arg = {}) {
  let aUrl = getURL(url);
  const headers = {};
  let body = null;

  const prepareBody = (data) => {
    headers["Content-Type"] = "application/json";
    return JSON.stringify(data);
  };

  if (data) {
    if (data.token) headers.Authorization = `Bearer ${data.token}`;
    if (data.query) aUrl += data.query;
    if (data instanceof FormData) body = data;
    else if (data.body instanceof FormData) body = data.body;
    else if (data.body) body = prepareBody(data.body);
    else if (!data.query) body = prepareBody(data);
  }
  return request(aUrl, { method, body, headers, ...arg, credentials });
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

export function translateError(error, lang = "en") {
  // console.log("translateError: >>> ", error);
  const [code, message] = error?.toLowerCase().split("-") || [];
  return (config.errors[code]?.[lang] || config.errors.default[lang]) + " " + (message || "");
}

/* *** Usage ***
const [handleRequest, loading, setLoading] = useApiRequest({ baseUrl, blockAlert });

const data = handleRequest(endpoint, ...)
*/
