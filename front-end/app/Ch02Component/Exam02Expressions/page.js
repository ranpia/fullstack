import Image from "next/image";

function fun() {
    return "fun()의 리턴값";
}


export default function Exam02Expressions() {

    const name = "리액트";
    const imageFile = "photo1.jpg";

    return (
        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
            <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-lg font-semibold">Exam02Expressions</h2>
            </header>
            <div className="p-4">
                <p>표현식</p>
                <p>{name}</p>
                <p>{fun()}</p>
                <p>
                    <Image src={`/images/${imageFile}`} width={300} height={120} loading="eager" alt="이미지" />
                </p>
                <p><Image src={"/images/" + imageFile} width={300} height={180} loading="eager" alt="이미지" /></p>

            </div>
        </section>
    );
}
