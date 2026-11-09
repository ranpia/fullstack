"use client";

import Image from "next/image";

export default function ChildComponent({ 
  imgFile, 
  changeImg 
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background text-foreground shadow-sm dark:border-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">ChildComponent</h3>
      </header>
      <div className="space-y-4 p-4">
        <button type="button" onClick={changeImg} className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
          이미지 변경
        </button>
        <div className="overflow-x-auto">
          <Image
            key={imgFile}
            src={`/images/${imgFile}`}
            alt="선택한 사진"
            width={300}
            height={200}
            unoptimized
            onLoad={(event) => {
              const image = event.currentTarget;
              image.style.width = `${image.naturalWidth}px`;
              image.style.height = "auto";
            }}
            style={{ maxWidth: "none", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
