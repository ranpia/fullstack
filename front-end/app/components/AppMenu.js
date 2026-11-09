import Link from "next/link";

const chapters = [
  {
    title: "Ch02Component",
    href: "/Ch02Component",
    examples: ["Exam01WrapElement", "Exam02Expressions", "Exam03Condition", "Exam04InlineStyle", "Exam05ExternalCss", "Exam06Comments", "Exam07EventHandling", "Exam08Repeat", "Exam09DomRef", "Exam10NestedLayout", "Exam11RuntimeErrorLayout"],
  },
  {
    title: "Ch03PropsAndState",
    href: "/Ch03PropsAndState",
    examples: ["Exam01Props", "Exam02PrimitiveTypeState", "Exam03ObjectTypeState", "Exam04FormState", "Exam05StateToProp"],
  },
  {
    title: "Ch04LifeCycle",
    href: "/Ch04LifeCycle",
    examples: [],
  },
  {
    title: "Ch05Routing",
    href: "/Ch05Routing",
    examples: ["Exam01Navigation", "Exam02QueryString"],
  },
  {
    title: "Ch07GlobalState",
    href: "/Ch07GlobalState",
    examples: ["Exam01ColorContext", "Exam02AuthContext"],
  },
  {
    title: "Ch08RestApi",
    href: "/Ch08RestApi",
    examples: ["Exam01Review", "Exam02MemberJoin", "Exam03MemberLogin"],
  },
];

export default function AppMenu() {
  return (
    <aside className="w-48 shrink-0 border-r border-zinc-200 bg-zinc-100 p-4 text-foreground dark:border-zinc-800 dark:bg-zinc-950">
      <section className="overflow-hidden rounded-lg border border-zinc-300 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-300 bg-zinc-200 px-3 py-1 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-semibold">AppMenu</h2>
        </header>
        <nav aria-label="메인 메뉴" className="space-y-2 p-2 text-sm">
          <Link href="/" className="block rounded px-2 py-2 hover:bg-zinc-100 focus-visible:outline-2 dark:hover:bg-zinc-800">
            홈
          </Link>
          {chapters.map((chapter) => (
            <details key={chapter.href} name="chapters" className="rounded border border-zinc-200 dark:border-zinc-800">
              <summary className="cursor-pointer break-words rounded bg-zinc-100 px-2 py-2 font-medium hover:bg-zinc-200 focus-visible:outline-2 dark:bg-zinc-900 dark:hover:bg-zinc-800">
                {chapter.title}
              </summary>
              <ul className="space-y-1 p-2">
                <li>
                  <Link href={chapter.href} className="block rounded px-2 py-2 hover:bg-zinc-100 focus-visible:outline-2 dark:hover:bg-zinc-800">
                    챕터 전체
                  </Link>
                </li>
                {chapter.examples.map((example) => (
                  <li key={example}>
                    <Link href={`${chapter.href}/${example}`} className="block break-words rounded px-2 py-2 hover:bg-zinc-100 focus-visible:outline-2 dark:hover:bg-zinc-800">
                      {example}
                    </Link>
                    {(example === "Exam10NestedLayout" || example === "Exam02QueryString") && (
                      <ul className="space-y-1 border-l border-zinc-200 pl-2 dark:border-zinc-800">
                        {(example === "Exam10NestedLayout" ? ["PageComponentA", "PageComponentB"] : ["ComponentA"]).map((page) => (
                          <li key={page}>
                            <Link
                              href={`${chapter.href}/${example}/${page}`}
                              className="block rounded px-2 py-2 hover:bg-zinc-100 focus-visible:outline-2 dark:hover:bg-zinc-800"
                            >
                              {page}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
      </section>
    </aside>
  );
}

