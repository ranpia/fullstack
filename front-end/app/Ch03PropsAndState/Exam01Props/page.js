import ChildComponent from "./ChildComponent";
import Image from "next/image"

export default function Exam01Props() {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam01Props</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>React 컴포넌트 학습 페이지입니다.</p>
        <ChildComponent name="React" version="1.0.0" >
          <Image src={'/images/photo1.jpg'} alt="이미지" width={100} height={100} />
        </ChildComponent>
      </div>
    </section>
  );
}
