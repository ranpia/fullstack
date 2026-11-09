function Exam06Comments() {
    const name = '리액트';
    return (
        <section id="Exam06Comments" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
            <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold">Exam06Comments</h2>
            </header>
            <div
                //시작 태그를 여러 줄로 작성하게 된다면 여기에 주석을 작성 할 수 있음.
                className="space-y-4 p-4">
                <>
                    {/* 주석은 이렇게 작성합니다. */}
                    <div>
                        <code>{"{/* 주석은 이렇게 작성합니다. */}"}</code>
                    </div>
                </>
            </div>
        </section>
    );
}
export default Exam06Comments;
