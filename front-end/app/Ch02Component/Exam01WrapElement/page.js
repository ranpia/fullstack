import ChildComponentA from "./ChildComponentA";
import ChildComponentB from "./ChildComponentB";

export default function Exam01WrapElement() {
  return (
    <section id="Exam01WrapElement" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam01WrapElement</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>여러 JSX 요소를 하나의 부모 요소로 감싸는 예제입니다.</p>
        <ChildComponentA />
        <ChildComponentB />
      </div>
    </section>
  );
}
