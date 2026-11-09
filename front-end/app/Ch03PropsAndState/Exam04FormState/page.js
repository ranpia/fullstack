"use client";

import { useState } from "react";

export default function Exam04FormState() {

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "홍길동",
    email: "hong@example.com"
  });

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value
    }));
  }

  const handle = () =>{
    
  }

  return (
    <section className="w-full rounded-lg border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
      <header className="rounded-t-lg border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="font-semibold">Exam04FormState</h2>
      </header>
      <div className="space-y-4 p-4">
        <div className="max-w-sm space-y-3">
          <label className="block text-sm font-medium">
            이름
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded border border-zinc-300 px-3 py-2 focus:outline-2 focus:outline-emerald-600 dark:border-zinc-600 dark:bg-zinc-800"
            />
          </label>
          <label className="block text-sm font-medium">
            이메일
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded border border-zinc-300 px-3 py-2 focus:outline-2 focus:outline-emerald-600 dark:border-zinc-600 dark:bg-zinc-800"
            />
          </label>
          <button type="submit" onClick={handleSubmit} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            제출
          </button>
        </div>
        <div aria-live="polite">
          {submitted && (
            <div className="rounded bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
              <p>이름: {formData.name}</p>
              <p>이메일: {formData.email}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
