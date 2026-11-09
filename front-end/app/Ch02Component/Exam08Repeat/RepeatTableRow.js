"use client";

export default function RepeatTableRowRow() {
  const boards = [
    { bno: 1, btitle: "제목1", bwriter: "user1", bdate: new Date("2026-11-03T00:00:00+09:00"), bhitcount: 0 },
    { bno: 2, btitle: "제목2", bwriter: "user2", bdate: new Date("2026-11-03T00:00:00+09:00"), bhitcount: 0 },
    { bno: 3, btitle: "제목3", bwriter: "user3", bdate: new Date("2026-11-03T00:00:00+09:00"), bhitcount: 0 }
  ];

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">RepeatTableRowRow</h3>
      </header>
      <div className="overflow-x-auto p-4">
        <table className="w-full min-w-[560px] table-fixed border-collapse text-center text-sm [&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2">
          <colgroup>
            <col className="w-[10%]" />
            <col className="w-[35%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead className="border-b border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
            <tr className="text-center">
              <th scope="col">bno</th>
              <th scope="col">btitle</th>
              <th scope="col">bwriter</th>
              <th scope="col">bdate</th>
              <th scope="col">bhitcount</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board) => (
              <tr key={board.bno} className="border-b border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
                <td>{board.bno}</td>
                <td className="break-words text-left">{board.btitle}</td>
                <td>{board.bwriter}</td>
                <td>{board.bdate.toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" })}</td>
                <td>{board.bhitcount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

