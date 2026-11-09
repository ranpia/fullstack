"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ComponentA() {
  const queryString = useSearchParams();
  const key1 = queryString.get("key1");
  const key2 = queryString.get("key2");

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">ComponentA</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>ComponentA 컴포넌트입니다.</p>
        <div>key1: {key1}</div>
        <div>key2: {key2}</div>
      </div>
    </section>
  );
}

export default function ComponentAPage() {
  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <Suspense fallback={<p>불러오는 중...</p>}>
        <ComponentA />
      </Suspense>
    </main>
  );
}
