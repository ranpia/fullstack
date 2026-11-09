"use client"

import { AuthContext } from "@/contexts/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";

export default function Exam02AuthContext() {

  const {memberId, setMemberId, setJwt, isLoaded} = useContext(AuthContext);
  const router = useRouter();
  const isLoggedIn = Boolean(memberId);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setMemberId("");
      setJwt("");
      redirect("/");
    } else {
      router.push("/Ch07GlobalState/Exam02AuthContext/LoginComponent");
    }

  }
  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">Exam02AuthContext</h1>
        </header>
        <div className="space-y-4 p-4">
          <p>AuthContext를 이용한 인증 상태 관리를 학습하는 페이지입니다.</p>
          {isLoaded ? (
          <button
            type="button"
            onClick={handleAuthClick}
            className="ml-auto rounded bg-green-600 px-[0.7rem] py-[0.35rem] text-[0.7rem] leading-[1.05rem] text-white hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            { isLoggedIn ? "로그아웃" : "로그인" }
          </button>
          ) : (
            <span aria-hidden="true" className="block h-7 w-18" />
          )}
        </div>
      </section>
    </main>
  );
}
