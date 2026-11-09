"use client";

import Link from "next/link";
import { useState } from "react";

export default function Exam11RuntimeErrorLayout() {
  
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error("런타임 오류 처리 학습을 위한 예제 오류입니다.");
  }
  
  return (
    <section id="Exam11RuntimeErrorLayout" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam11RuntimeErrorLayout</h2>
      </header>
      <div className="space-y-4 p-4">
        <p role="alert">페이지 실행 중 오류가 발생했습니다.</p>
        <p>잠시 후 다시 시도하거나 홈으로 이동해 주세요.</p>
        <Link
          href="/"
          className="inline-block rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        >
          홈으로 돌아가기
        </Link>
        <button
          type="button"
          onClick={() => setHasError(true)}
          className="block rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          런타임 오류 발생시키기
        </button>
      </div>
    </section>
  );
}
