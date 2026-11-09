"use client";

export default function RepeatWithIndex() {
  const items = ["사과", "배", "딸기"];

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">RepeatWithIndex</h3>
      </header>
      <div className="space-y-4 p-4">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>{index + 1}. {item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
