"use client";

import { useState } from "react";

function createRandomColor() {
  return "#" + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, "0");
}

export default function Exam03ObjectTypeState() {
  const [state, setState] = useState({
    number: 0,
    color: "black"
  });

  const changeColor = () => {
    const newColor = createRandomColor();
    setState((previousState) => ({
      ...previousState,
      color: newColor
    }));
  }

  const raisenumber = () => {
    // const newNumber = { number: state.number + 1, color: state.color };
    //const newNumber = { ...state, number: state.number + 1 };
    // const newNumber = { number: state.number + 1, color: state.color, number: state.number + 1 };
    //setState({ newNumber });
    setState({...state,number: state.number + 1});
    setState({...state,number: state.number + 3});
  }

  return (
    <section id="Exam03ObjectTypeState" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam03ObjectTypeState</h2>
      </header>
      <div className="space-y-4 p-4">
        <p aria-live="polite" style={{ color: state.color }}>횟수 (숫자 상태): <span className="text-5xl font-bold">{state.number}</span></p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={raisenumber} className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
            횟수 증가
          </button>
          <button type="button" onClick={changeColor} className="rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
            색상 변경
          </button>
        </div>
        <figure className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <figcaption className="mb-4 font-semibold">다음 클릭의 업데이트 간트 차트 · 시간 →</figcaption>
          <div className="overflow-x-auto">
            <div className="grid min-w-[800px] grid-cols-[120px_repeat(6,minmax(0,1fr))] items-center gap-y-3 text-center text-sm">
              <div>처리 단계</div>
              {["첫 호출", "두 번째 호출", "이벤트 종료", "첫 요청 적용", "둘째 요청 적용", "화면 반영"].map((step) => (
                <div key={step} className="border-l border-zinc-300 px-1 py-2 dark:border-zinc-700">{step}</div>
              ))}

              <div className="font-semibold">읽는 상태</div>
              <div className="col-span-2 rounded bg-blue-100 p-3 text-blue-950">두 호출 모두 {state.number}을 읽음</div>
              <div className="col-span-4" />

              <div className="font-semibold">첫 요청 (+1)</div>
              <div className="rounded-l bg-orange-200 py-3 text-orange-950">{state.number + 1} 요청</div>
              <div className="col-span-2 border-y border-dashed border-orange-400 bg-orange-50 py-3 text-orange-950">큐에서 대기</div>
              <div className="rounded-r bg-orange-500 py-3 font-semibold text-black">{state.number + 1} 적용</div>
              <div className="col-span-2" />

              <div className="font-semibold">둘째 요청 (+3)</div>
              <div />
              <div className="rounded-l bg-purple-200 py-3 text-purple-950">{state.number + 3} 요청</div>
              <div className="col-span-2 border-y border-dashed border-purple-400 bg-purple-50 py-3 text-purple-950">큐에서 대기</div>
              <div className="rounded-r bg-purple-500 py-3 font-semibold text-white">{state.number + 3} 적용</div>
              <div />

              <div className="font-semibold">화면의 숫자</div>
              <div className="col-span-5 rounded-l bg-zinc-100 py-3 dark:bg-zinc-800">{state.number} 유지</div>
              <div className="rounded-r bg-green-200 py-3 text-xl font-bold text-green-950">{state.number + 3}</div>
            </div>
          </div>
          <p className="mt-4 text-sm">첫 요청이 적용된 뒤 둘째 요청이 덮어쓰므로 최종 값은 {state.number + 3}입니다.</p>
          <p className="mt-2 text-xs">개념적인 순서도입니다. 막대 길이는 실제 소요 시간이 아니며, 두 요청은 병렬 실행이 아닌 호출 순서대로 처리됩니다.</p>
        </figure>
      </div>
    </section>
  );
}
