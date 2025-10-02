import Image from "next/image";
import { cookies } from "next/headers";
import { getSupportedLanguage } from "@/util/get-browser-language";
import { linkCls } from "@/ui-library/tailwind/button";

export default async function Home({ params, searchParams }) {
  const lang =
    getSupportedLanguage(
      (await params).lang || (await searchParams)?.lang || (await cookies()).get("lang")?.value
    ) || "ar";

  console.log("Home:", lang);
  return (
    <>
      {/* "flex flex-col gap-[32px] row-start-2 items-center sm:items-start" */}
      <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

      <a href="/test" className={linkCls}>
        Go to Test Component page
      </a>
    </>
  );
}

/**  Next.js buttons: */
// <div className="flex gap-4 items-center flex-col sm:flex-row">
//   <a
//     className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//     href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <Image className="dark:invert" src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
//     Deploy now
//   </a>
//   <a
//     className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//     href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Read our docs
//   </a>
// </div>;
