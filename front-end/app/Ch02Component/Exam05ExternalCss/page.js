import styles from "./exam05ExternalCss.module.css";
import ChildComponent from "./ChildComponent";

export default function Exam05ExternalCss() {
  return (
    <section id="Exam05ExternalCss" className="scroll-mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam05ExternalCss</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>외부 CSS 파일에 정의한 스타일을 적용합니다.</p>
        <div className={styles.example}>외부 스타일 적용</div>
        <ChildComponent />
      </div>
    </section>
  );
}
