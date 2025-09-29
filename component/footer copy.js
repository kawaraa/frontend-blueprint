"use client";
// import Image from "next/image";
import { State } from "@/app/state";

export default function Footer(props) {
  const { user } = State();

  if (!user?.id) return null;
  return <footer className="flex gap-[24px] flex-wrap items-center justify-center"></footer>;
}
