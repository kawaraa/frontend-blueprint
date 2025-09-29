"use client";
import { useState } from "react";
import IosInstallModal from "./ios-install-modal";

export default function TextComponent({ params, searchParams }) {
  // const [loading, setLoading] = useState(true);
  const [x, setX] = useState(true);
  return (
    <>
      <button onClick={() => setX(true)}>show</button>
      <IosInstallModal lang="en" />
    </>
  );
}
