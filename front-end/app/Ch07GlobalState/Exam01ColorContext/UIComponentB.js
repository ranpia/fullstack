"use client";

import { useContext } from "react";
import { ColorContext } from "@/contexts/ColorContext";

export default function UIComponentB() {
  const { color } = useContext(ColorContext);
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">UIComponentB</h2>
      </header>
      <div className="space-y-4 p-4">
        <p>UIComponentB 컴포넌트입니다.</p>
        <div
          className="h-24 rounded-lg border border-zinc-300 dark:border-zinc-600"
          style={{ backgroundColor: color }}
          role="alert"
          aria-label={`선택한 색상 미리보기: ${color}`}
        />
        <p>전역 상태의 색상: {color}</p>
      </div>
    </section>
  );
}
