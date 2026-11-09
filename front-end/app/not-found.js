import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">NotFound</h1>
        </header>
        <div className="space-y-4 p-4">
          <p>잘못된 URL을 입력하셨습니다. 주소를 다시 확인해 주세요.</p>
          <Link
            href="/"
            className="inline-block rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
