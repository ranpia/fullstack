"use client";

import { useEffect, useState } from "react";

export default function Ch04LifeCycle() {
  
  const [count1, setCount1] = useState(0); 
  const [count2, setCount2] = useState(0); 

  useEffect(() => {
    console.log("마운트 상태/업데이트 후 상태입니다.");
    return () => {
      console.log("언마운트 상태입니다./업데이트 전 상태입니다.");
    }
  }); // 두번째 매개값 빈 배열 넣을시 마운트 상태에만 한번 실행 

  useEffect(() => {
    console.log("마운트 상태/count1 업데이트 후 상태입니다.");
    return () => {
      console.log("언마운트 상태입니다./count1 업데이트 전 상태입니다.");
    }
  }, [count1]); // count1 값이 변경될 때만 실행됨
  // 빈 배열에 useState 변수 넣으면 해당 변수 값이 변경될때만 실행됨

  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">Ch04LifeCycle</h1>
        </header>
        <div className="space-y-4 p-4">
          <p>React 컴포넌트의 생명주기를 학습하는 페이지입니다.</p>
          <p>카운트: {count1}</p>
          <button className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700" onClick={() => setCount1((prev) => prev + 1)}>카운트 증가</button>

          <p>카운트: {count2}</p>
          <button className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700" onClick={() => setCount2((prev) => prev + 1)}>카운트 증가</button>
        </div>
      </section>
    </main>
  );
}
