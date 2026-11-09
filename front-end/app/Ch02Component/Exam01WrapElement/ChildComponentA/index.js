function ChildComponentA() {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">ChildComponentA</h3>
      </header>
      <div className="p-4">
        <p>ChildComponentA 컴포넌트입니다.</p>
      </div>
    </section>
  );
}

export default ChildComponentA;