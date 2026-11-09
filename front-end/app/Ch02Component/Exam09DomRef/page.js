"use client"

import { useRef } from "react";

export default function Exam09DomRef() {
  const inputRef = useRef(null);

  function handleKeyDown() {
    inputRef.current.style.backgroundColor = "yellow";
    document.querySelector('input[name="message"]');
    console.log(inputRef.current);
  }

  const handleClick = () => {
    console.log(inputRef.current.value);
  }

  return (
    <section id="Exam09DomRef" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam09DomRef</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>useRef로 입력 요소를 참조하여 배경색을 변경합니다.</p>
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-2">
            입력 내용
            <input
              ref={inputRef}
              type="text"
              onKeyDown={handleKeyDown}
              name="message"
              className="w-full rounded border border-zinc-300 bg-background px-3 py-2 focus-visible:outline-2 focus-visible:outline-green-600 dark:border-zinc-700"
              placeholder="내용을 입력하세요"
            />
          </label>
          <button
            type="button"
            onClick={handleClick}
            className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            입력창에 포커스
          </button>
        </div>
      </div>
    </section>
  );
}
