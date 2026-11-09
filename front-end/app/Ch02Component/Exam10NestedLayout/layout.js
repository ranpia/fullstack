export default function Exam10NestedLayout({ children }) {
  return (
    <section id="Exam10NestedLayout" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam10NestedLayout</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>중첩 레이아웃 학습 페이지입니다.</p>
        {children}
      </div>
    </section>
  );
}

