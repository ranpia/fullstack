
import Exam01Props from "./Exam01Props/page";

export default function Ch03PropsAndState() {
  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">Ch03PropsAndState</h1>
        </header>
        <div className="space-y-4 p-4">
          <p>React 컴포넌트 학습 페이지입니다.</p>
          <Exam01Props />
        </div>
      </section>
    </main>
  );
}

