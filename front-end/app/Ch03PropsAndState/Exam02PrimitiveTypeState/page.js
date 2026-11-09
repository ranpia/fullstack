"use client";

import { useEffect, useState } from "react";

function createRandomColor() {
  return "#" + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, "0");
}

export default function Exam02PrimitiveTypeState() {
  const [name, setName] = useState("리액트");
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState("white"); 

  const changeColor = () => {
    const newColor = createRandomColor();
    setColor(newColor);
  }

  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setColor(createRandomColor());
  //   }, 100);

  //   return () => clearInterval(timerId);
  // }, []);

  return (
    console.log("Exam02PrimitiveTypeState render"),
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam02PrimitiveTypeState</h2>
      </header>
      <div className="space-y-4 p-4">
        <label className="flex flex-col gap-2">
          이름 (문자열 상태)
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full max-w-sm rounded border border-zinc-300 bg-background px-3 py-2 focus-visible:outline-2 focus-visible:outline-green-600 dark:border-zinc-700"
          />
        </label>
        <p>이름: {name}</p>
        <p aria-live="polite" style={{color}}>횟수 (숫자 상태): <span className="text-5xl font-bold">{count}</span></p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => setCount((previousCount) => previousCount + 1)} className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
            횟수 증가
          </button>
          <button type="button" onClick={() => setVisible((previousVisible) => !previousVisible)} aria-pressed={visible} className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
            {visible ? "안내 숨기기" : "안내 보이기"}
          </button>
          <button type="button" onClick={changeColor} className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
            색상 변경
          </button>
        </div>
        {visible && <p>불리언 상태가 true일 때 표시되는 안내입니다.</p>}
      </div>
    </section>
  );
}
