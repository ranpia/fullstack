import RepeatTableRow from "./RepeatTableRow";
import RepeatWithIndex from "./RepeatWithIndex";

export default function Exam08Repeat() {
  const subjects = [
    { id: 1, name: "컴포넌트" },
    { id: 2, name: "표현식" },
    { id: 3, name: "이벤트 처리" },
  ];

  return (
    <section id="Exam08Repeat" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam08Repeat</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>배열의 map()으로 목록을 반복 렌더링합니다.</p>
        <ul className="list-inside list-disc space-y-2">
          {subjects.map((subject) => (
            <li key={subject.id}>{subject.name}</li>
          ))}
        </ul>
        <RepeatTableRow />
        <RepeatWithIndex />
      </div>
    </section>
  );
}
