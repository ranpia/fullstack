"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Exam02QueryString() {

  const router = useRouter();

  const [key1, setKey1] = useState("value1");
  const [key2, setKey2] = useState("value2");

  const handleClick = () => {
    router.push(`/Ch05Routing/Exam02QueryString/ComponentA?key1=${key1}&key2=${key2}`);
  }

  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">Exam02QueryString</h1>
        </header>
        <div className="space-y-4 p-4">
          <p>Next.js의 쿼리 문자열을 학습하는 페이지입니다.</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/Ch05Routing/Exam02QueryString/ComponentA?key1=${key1}&key2=${key2}`}
              className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 active:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              ComponentA {/* 절대경로 */}
            </Link>
            <Link
              href={`Exam02QueryString/ComponentA?key1=${key1}&key2=${key2}`}
              className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 active:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              ComponentA {/* 상대 경로 */}
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleClick}
              className="cursor-pointer rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 active:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              ComponentA
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
