"use client"

import { useContext } from "react";
import { ColorContext } from "@/contexts/ColorContext";


export default function UIComponentA() {

  const colorContext = useContext(ColorContext);
  const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

  const handleClick = (color) => {
    colorContext.setColor(color);
  }

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">UIComponentA</h2>
      </header>
      <div className="space-y-4 p-4">
        <div role="group" aria-label="색상 팔레트" className="flex flex-wrap gap-3">
          {colors.map((color, index) => (
            <button
              key={index}
              type="button"
              aria-label={color}
              aria-pressed={colorContext.color === color}
              title={color}
              onClick={()=> handleClick(color)}
              style={{ background: color, width: "24px", height: "24px", cursor: "pointer" }}
              className="h-10 w-10 cursor-pointer rounded-full border border-zinc-300 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 aria-pressed:ring-2 aria-pressed:ring-orange-500 aria-pressed:ring-offset-2 dark:border-zinc-600 dark:ring-offset-zinc-900"
            />
          ))}
        </div>
        <p>선택한 색상: {colorContext.color}</p>
      </div>
    </section>
  );
}
