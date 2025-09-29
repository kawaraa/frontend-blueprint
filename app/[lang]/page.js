import { getSupportedLanguage } from "@/util/get-browser-language";
import HomePage from "../page";

export default async function HomePageByLang(props) {
  if (!getSupportedLanguage((await props.params).lang)) return null;
  return <HomePage {...props} />;
}

export async function generateMetadata({ params }) {
  return (await params).lang != "en" ? null : { alternates: { canonical: "/" } };
}
