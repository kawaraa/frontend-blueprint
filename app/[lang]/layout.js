import { notFound } from "next/navigation";
import getMetadata, { content } from "../metadata.js";
import { getSupportedLanguage } from "@/util/get-browser-language.js";

export default async function LayoutPageByLang({ children, params }) {
  if (!getSupportedLanguage((await params).lang)) return notFound();
  return children;
}

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  return !getSupportedLanguage(lang)
    ? null
    : getMetadata({ lang, title: content.title[lang] + " ArabLocalMarket" });
}
