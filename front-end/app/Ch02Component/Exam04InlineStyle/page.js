export default function Exam04InlineStyle() {

    const myStyle = {
        backgroundColor: "lightblue",
        color: "darkblue",
        fontSize: "20px",
        fontWeight: "bold",
    }

    return (
        <section id="Exam04InlineStyle" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
            <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold">Exam04InlineStyle</h2>
            </header>
            <div className="space-y-4 p-4">
                <div style={{
                    backgroundColor: "lightblue",
                    color: "darkblue",
                    fontSize: "20px",
                    fontWeight: "bold",
                }}>
                    인라인 스타일 적용
                </div>
                <div style={myStyle}>
                    인라인 스타일 적용
                </div>
            </div>
        </section>
    );
}