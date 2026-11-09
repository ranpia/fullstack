export default function ChildComponent({ 
  name, 
  version = 10, 
  children 
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">ChildComponent</h3>
      </header>
      <div className="space-y-4 p-4">
        <p>이름: {name}</p>
        <p>version: {version}</p>
        <p>children: {children}</p>
      </div>
    </section>
  );
}
