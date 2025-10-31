"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getBrowserLanguage } from "k-utilities/browser/device-fingerprint";
import SelectLanguageDialog from "@/component/select-language-dialog";
import { Cookies } from "k-utilities/browser/cookies";
// import Messages from "./components/messages";
// import Loader from "./components/loader";

const StateContext = createContext();

export function RootStateProvider({ children, lang }) {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({ loading: true });
  const [showLangDialog, setShowLangDialog] = useState(false);

  const addMessage = (msg) => setMessages([...messages, msg]);

  const updateLang = async (lang) => {
    const langRegEx = /\/en|\/ar/gim;
    if (Cookies.get("lang") != lang) Cookies.set("lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.classList.remove("en", "ar");
    document.documentElement.classList.add(lang);
    await registerServiceWorker(true); // Delete the cache because Iphone does not change the language
    if (window.location.pathname == "/") window.location.href = `/${lang}`;
    else if (!window.location.pathname.match(langRegEx)) window.location.reload();
    else window.location.href = window.location.pathname.replace(langRegEx, `/${lang}`);
  };

  useEffect(() => {
    const language = getBrowserLanguage().split(",")[0];
    if (!lang) {
      if (!language) updateLang(language);
      else setShowLangDialog(true);
    }
    // registerServiceWorker();
    // setUser({ id: "some-id", name: "Mister Tester" });
    setUser(null);
  }, []);

  return (
    <StateContext.Provider value={{ lang: lang || "en", user, messages, addMessage }}>
      {children}
      {/* {user?.loading && <Loader size="40" wrapperCls="z-9 absolute inset-0 !m-0 bg-blur" />}
      <Messages messages={messages} setMessages={setMessages} /> */}
      <SelectLanguageDialog open={showLangDialog} />
    </StateContext.Provider>
  );
}

export const State = () => useContext(StateContext);

function registerServiceWorker(update) {
  if ("serviceWorker" in navigator && !window.location.origin.includes("localhost")) {
    return navigator.serviceWorker.getRegistrations().then(async (registrations) => {
      for (const registration of registrations) {
        if (
          registration.active.state == "activated" &&
          registration.active?.scriptURL?.includes("service-worker.js") &&
          !update
        ) {
          continue;
        }
        await new Promise((res, rej) => registration.unregister().then(res).catch(rej));
      }

      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => console.log("Registration scope: ", registration.scope))
        .catch((error) => console.log("Web Worker Registration Error: ", error));
    });
  }
}
