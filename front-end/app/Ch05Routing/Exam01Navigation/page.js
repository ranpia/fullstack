"use client";

import { redirect, useRouter } from "next/navigation";

export default function Exam01Navigation() {

  const router = useRouter();

  const handleClick = () => {
    // 코드상에 어떤 조건이 될 경우, 자동 이동
    // 로그인, 회원 가입 처리 후 자동 이동
    // redirect("/");

    // 특정 경로로 이동을 할 경우(일반적인 경우)
    router.push("/Ch02Component");
  }

  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">Exam01Navigation</h1>
        </header>
        <div className="space-y-4 p-4">
          <p>Next.js의 페이지 이동을 학습하는 페이지입니다.</p>
          <button
            type="button"
            onClick={handleClick}
            className="cursor-pointer rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 active:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            버튼
          </button>
        </div>
      </section>
    </main>
  );
}
