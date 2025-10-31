"use client";
import Image from "next/image";
// import { title } from "../content/shared";
import Link from "next/link";
import { State } from "@/app/state";
import { LogOut } from "lucide-react";
const liCls = "";
const linkCls = "block  underline underline-offset-8";

export default function Navigation({ lang }) {
  // console.log("Navigation:", lang);
  const { user } = State();
  const loginLink = user?.loading ? (
    ""
  ) : (
    <li className={liCls}>
      <Link href="/login" className={linkCls}>
        تسجيل الدخول
      </Link>
    </li>
  );

  return (
    <nav
      className="z-[7] bg-white sticky w-full flex px-1 sm:px-2 md:px-4 top-0 card border no-select"
      dir="auto"
    >
      <ul className="flex-auto flex items-center gap-3 no-select p-4">
        {!user?.id ? (
          <li className="w-7">
            <Link href="/logout" className="block hover:text-[red]">
              <LogOut />
            </Link>
          </li>
        ) : (
          loginLink
        )}
        <li className="w-3"></li>
        <li className={liCls}>
          <Link href="/application" className={linkCls}>
            طلب توظيف
          </Link>
        </li>
        <li className={liCls}>
          <Link href="/survey" className={linkCls}>
            استبيان
          </Link>
        </li>
      </ul>

      <div className="w-24 mx-auto flex justify-center items-center">
        {/* <p className="text-center text-sm">{title[lang]}</p> */}
        <div className="w-16">
          <Image src="/next.svg" width="100" height="100" alt="logo" />
        </div>
      </div>
    </nav>
  );
}
