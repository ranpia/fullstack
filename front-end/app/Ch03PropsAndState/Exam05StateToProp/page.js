"use client";

import { useState } from "react";
import ChildComponent from "./ChildComponent";

export default function Exam05StateToProp() {

  const [imgFile, setImgFile] = useState("photo1.jpg");

  const changeImg = () => {
    if (imgFile === "photo17.jpg") {
      setImgFile("photo1.jpg");
    }
    else{
      setImgFile((previousImgFile) => {
        const currentNumber = parseInt(previousImgFile.match(/\d+/)[0]);
        const nextNumber = currentNumber + 1;
        if (nextNumber === 16) {
          return "photo17.jpg";
        }
        return `photo${nextNumber}.jpg`;
      });
    }
  }

  return (
    <section id="Exam05StateToProp" className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Exam05StateToProp</h2>
      </header>
      <div className="space-y-4 p-4">
        <ChildComponent imgFile={imgFile} changeImg={changeImg} />
      </div>
    </section>
  );
}

