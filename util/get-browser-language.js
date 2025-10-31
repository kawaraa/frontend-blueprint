import { supportedLanguages } from "@/content/shared";

export const getSupportedLanguage = (lang) => supportedLanguages.find((l) => l.code == lang)?.code;

export const extractLanguage = async (params, searchParams, cookies) =>
  (await params)?.lang || (await searchParams)?.lang || (await cookies)?.get("lang")?.value;
