"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createReview } from "@/apis/reviewApi";

const inputClass = "w-full rounded-xl border border-zinc-200 bg-zinc-50/70 px-4 py-3 text-sm leading-6 transition-colors placeholder:text-zinc-400 hover:border-zinc-300 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/10 dark:border-zinc-700 dark:bg-zinc-950/50 dark:focus:bg-zinc-950";
const TITLE_MAX_LENGTH = 200;

function validateTitle(title) {
  if (!title.trim()) return "제목을 입력해 주세요.";
  if (Array.from(title.trim()).length > TITLE_MAX_LENGTH) return `제목은 ${TITLE_MAX_LENGTH}자 이내로 입력해 주세요.`;
  return "";
}

function validateContent(content) {
  return content.trim() ? "" : "후기 내용을 입력해 주세요.";
}

export default function CreateReview() {
  const router = useRouter();
  const submitting = useRef(false);
  const fileInput = useRef(null);
  const titleInput = useRef(null);
  const contentInput = useRef(null);
  const [attachment, setAttachment] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({ title: "", content: "" });
  const [form, setForm] = useState({ title: "", content: "", writer: "user1", productId: 221 });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "title"
      ? Array.from(value).slice(0, TITLE_MAX_LENGTH).join("")
      : value;
    setForm((prev) => {
      return { ...prev, [name]: nextValue }
    });
    setErrors((prev)=>({...prev, [name]: ""}))
  };

  const handleSubmit = async () => {
    if (submitting.current) return;

    // 오류 상태를 갱신한 직후 읽지 않고, 이번 검사 결과로 등록 여부를 결정합니다.
    const validationErrors = {
      title: validateTitle(form.title),
      content: validateContent(form.content),
    };
    setErrors(validationErrors);
    setErrorMessage("");
    if (validationErrors.title || validationErrors.content) {
      if (validationErrors.title) {
        titleInput.current?.focus();
      } else {
        contentInput.current?.focus();
      }
      return;
    }

    const productId = Number(form.productId);

    // ref는 즉시 잠그고, state는 다음 렌더링에서 입력과 버튼을 비활성화합니다.
    submitting.current = true;
    setIsSaving(true);
    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("content", form.content.trim());
      formData.append("writer", form.writer.trim());
      formData.append("productId", String(productId));
      if (attachment) {
        formData.append("file", attachment);
      }
      await createReview(formData);
      router.push("/Ch08RestApi/Exam01Review");
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      setErrorMessage("게시글을 등록하지 못했습니다. 제목과 내용정보를 확인하고 다시 시도해 주세요.");
    } finally {
      submitting.current = false;
      setIsSaving(false);
    }
  };

  return (
    <main className="flex-1 bg-zinc-50/60 p-4 text-foreground sm:p-8 dark:bg-zinc-950/30">
      <section className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-background shadow-xl shadow-zinc-200/30 dark:border-zinc-800 dark:shadow-none">
        <header className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50/50 px-6 py-7 sm:px-8 dark:border-zinc-800 dark:from-orange-950/30 dark:to-zinc-900">
          <span className="mb-3 inline-block rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-semibold text-orange-700 dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-300">CreateReview</span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">새 리뷰 작성</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">상품을 사용한 경험을 들려주세요. 작은 후기가 다른 선택에 도움이 됩니다.</p>
        </header>
        <div className="space-y-6 p-6 sm:p-8">
          <fieldset disabled={isSaving} className="space-y-6 disabled:opacity-60">
            <legend className="sr-only">게시글 작성</legend>
            <label className="block space-y-2">
              <span className="flex items-center justify-between text-sm font-medium">제목<span className="text-xs font-normal text-zinc-500">{Array.from(form.title).length} / {TITLE_MAX_LENGTH}자</span></span>
              <input ref={titleInput} name="title" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "title-error" : undefined} placeholder="리뷰의 핵심을 한 줄로 적어주세요" value={form.title} onChange={handleChange} required className={inputClass} />
              {errors.title && <span id="title-error" role="alert" className="block text-sm text-red-600 dark:text-red-400">{errors.title}</span>}
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-medium">작성자</span>
                <input name="writer" value={form.writer} readOnly className={inputClass} />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium">상품 ID</span>
                <input name="productId" type="number" value={form.productId} readOnly className={inputClass} />
              </label>
            </div>
            <label className="block space-y-2">
              <span className="flex items-center justify-between text-sm font-medium">내용<span className="text-xs font-normal text-zinc-500">{Array.from(form.content).length.toLocaleString()}자</span></span>
              <textarea ref={contentInput} name="content" aria-invalid={Boolean(errors.content)} aria-describedby={errors.content ? "content-error" : undefined} placeholder="사용하면서 좋았던 점이나 아쉬웠던 점을 자유롭게 남겨주세요." rows={9} value={form.content} onChange={handleChange} required className={`${inputClass} min-h-48 resize-y`} />
              {errors.content && <span id="content-error" role="alert" className="block text-sm text-red-600 dark:text-red-400">{errors.content}</span>}
            </label>
            <div className="space-y-3 rounded-xl border border-dashed border-orange-200 bg-orange-50/40 p-5 dark:border-zinc-700 dark:bg-zinc-900/50">
              <label className="block space-y-2">
                <span className="text-sm font-medium">첨부파일 (선택 · 최대 10MB)</span>
                <input
                  ref={fileInput}
                  type="file"
                  onChange={(event) => setAttachment(event.target.files?.[0] ?? null)}
                  className="block w-full cursor-pointer text-sm text-zinc-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:font-semibold file:text-orange-700 file:shadow-sm hover:file:bg-orange-100 focus-visible:outline-2 focus-visible:outline-orange-500 dark:file:bg-zinc-800 dark:file:text-orange-300"
                />
              </label>
              {attachment && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-3 text-sm dark:bg-zinc-800">
                  <p className="break-all">{attachment.name} ({(attachment.size / 1024).toFixed(1)} KB)</p>
                  <button
                    type="button"
                    onClick={() => {
                      setAttachment(null);
                      if (fileInput.current) fileInput.current.value = "";
                    }}
                    className="rounded border border-zinc-300 px-2 py-1 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >첨부 취소</button>
                </div>
              )}
            </div>
          </fieldset>
          {errorMessage && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">{errorMessage}</p>}
          <div className="flex justify-end gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <button type="button" disabled={isSaving} onClick={() => router.push("/Ch08RestApi/Exam01Review")} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800">취소</button>
            <button type="button" onClick={handleSubmit} disabled={isSaving} className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-wait disabled:opacity-50">{isSaving ? "등록 중..." : "리뷰 등록"}</button>
          </div>
        </div>
      </section>
    </main>
  );
}
