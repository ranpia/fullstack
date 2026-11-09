export default function PageA() {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">PageA</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>중첩 레이아웃의 PageA 페이지입니다.</p>
      </div>
    </section>
  );
}
