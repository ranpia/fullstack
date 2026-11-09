export default function ChildFileComponent() {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">ChildFileComponent</h3>
      </header>
      <div className="space-y-4 p-4">
        <p>하나의 JavaScript 파일로 작성한 UI 컴포넌트입니다.</p>
      </div>
    </section>
  );
}
