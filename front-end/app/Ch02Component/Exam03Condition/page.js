export default function Exam03Condition() {
    const var1 = "리액트";
    return (
        <section id="Exam03Condition" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
            <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold">Exam03Condition</h2>
            </header>
            <div className="space-y-4 p-4">
                <div>
                    {/* 삼항 연산자로 if문 대체 */}
                    <div>{(var1 !== "리액트") ? <p>true</p> : <p>false</p>}</div>

                    {/* &&와 || 연산자로 if문 대체 */}
                    <div>{(var1 === "리액트") && <p>true</p>}</div>    {/* <p>true</p> */}
                    <div>{(var1 !== "리액트") && <p>false</p>}</div> {/* 값없음 */}
                    <div>{(var1 === "리액트") || <p>true</p>}</div> {/* 값없음 */}
                    <div>{(var1 !== "리액트") || <p>false</p>}</div> {/* <p>false</p> */}
                </div>
            </div>
        </section>
    );
}