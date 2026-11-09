"use client";

import ChildFileComponent from "./ChildFileComponent";

export default function Exam07EventHandling() {

  function handleClick1() {
    console.log("버튼 1을 클릭함");
  }

  function handleClick3(event, name) {
    console.log(event);
    console.log(`${name}을 클릭함`);
  }

  return (
    <section id="Exam07EventHandling" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam07EventHandling</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>onClick으로 버튼 클릭 이벤트를 처리합니다.</p>
        <button
          type="button"
          onClick={handleClick1}
          className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        >
          버튼 1
        </button>

        <button
          type="button"
          onClick={() => console.log("버튼 2을 클릭함")}
          className="rounded bg-green-700 px-4 py-2 mx-1 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        >
          버튼 2
        </button>

        <button
          type="button"
          onClick={(event) => handleClick3(event, "버튼 3")}
          className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        >
          버튼 3
        </button>

        <div onClick={() => console.log("컨테이너 클릭")} className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
          컨테이너
        </div>
        <hr />

        <ChildFileComponent />
      </div>
    </section>
  );
}
