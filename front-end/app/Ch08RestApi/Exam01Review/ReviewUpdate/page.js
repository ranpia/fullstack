"use client";

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getReview, getReviewImageUrl, updateReview } from "@/apis/reviewApi";
import Image from "next/image";

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

function buildUpdateFormData(reviewId, form, attachment, deletePhoto) {
  const data = new FormData();
  data.append("reviewId", reviewId);
  data.append("title", form.title.trim());
  data.append("content", form.content.trim());
  data.append("writer", form.writer.trim());
  data.append("productId", String(form.productId));
  if (deletePhoto) {
    data.append("fileName", "Delete");
    // FormData에 null을 넣으면 문자열 "null"이 됩니다. fileType은 생략합니다.
  } else if (attachment) {
    data.append("file", attachment);
  }
  return data;
}

function ReviewUpdateForm({ reviewId }) {
  const router = useRouter();
  const submitting = useRef(false);
  const fileInput = useRef(null);
  const titleInput = useRef(null);
  const contentInput = useRef(null);

  const [attachment, setAttachment] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({ title: "", content: "" });
  const [form, setForm] = useState({ title: "", content: "", writer: "", productId: "" });

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // // Cache Components가 화면을 보존해도 작성 중인 값은 다음 진입에 남기지 않습니다.
  // useLayoutEffect(() => {
  //   return () => {
  //     submitting.current = false;
  //     setAttachment(null);
  //     setDeletePhoto(false);
  //     setImageError(false);
  //     setIsSaving(false);
  //     setErrorMessage("");
  //     setErrors({ title: "", content: "" });
  //     setForm({ title: "", content: "", writer: "", productId: "" });
  //     setLoadError("");
  //     setIsLoading(true);
  //   };
  // }, []);

  useEffect(() => {
    if (!reviewId) return;
    let ignore = false;
    getReview(reviewId)
      .then((data) => {
        if (!ignore) setForm(data);
      })
      .catch(() => {
        if (!ignore) setLoadError("리뷰를 불러오지 못했습니다.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });
    // 언마운트 시에 사용 
    return () => { ignore = true; };
  }, [reviewId]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name !== "title" && name !== "content") return;
    const nextValue = name === "title"
      ? Array.from(value).slice(0, TITLE_MAX_LENGTH).join("")
      : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setAttachment(file);
    if (file) setDeletePhoto(false);
  };

  const handleDeletePhotoChange = (event) => {
    const checked = event.target.checked;
    setDeletePhoto(checked);
    if (checked) {
      setAttachment(null);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const handleAttachmentCancel = () => {
    setAttachment(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleCancel = () => {
    router.push("/Ch08RestApi/Exam01Review");
  };

  const validateForm = () => {
    const validationErrors = {
      title: validateTitle(form.title),
      content: validateContent(form.content),
    };
    setErrors(validationErrors);
    if (validationErrors.title || validationErrors.content) {
      if (validationErrors.title) {
        titleInput.current?.focus();
      } else {
        contentInput.current?.focus();
      }
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (submitting.current || isLoading || loadError || !reviewId) return;
    setErrorMessage("");
    if (!validateForm()) return;

    // ref는 즉시 잠그고, state는 다음 렌더링에서 입력과 버튼을 비활성화합니다.
    submitting.current = true;
    setIsSaving(true);
    try {
      const formData = buildUpdateFormData(reviewId, form, attachment, deletePhoto);
      const result = await updateReview(formData);
      if (result.status && result.status !== "success") throw new Error("수정 실패");
      router.push(`/Ch08RestApi/Exam01Review/ReviewDetail?reviewId=${encodeURIComponent(reviewId)}`);
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
      setErrorMessage("리뷰를 수정하지 못했습니다. 제목과 내용정보를 확인하고 다시 시도해 주세요.");
    } finally {
      submitting.current = false;
      setIsSaving(false);
    }
  };

  if (!reviewId || loadError || isLoading) {
    return <main className="flex-1 p-8"><section className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"><h1 className="mb-3 font-semibold">ReviewUpdate</h1><p role="status">{!reviewId ? "리뷰 번호가 필요합니다." : loadError || "리뷰를 불러오는 중입니다."}</p></section></main>;
  }

  return (
    <main className="flex-1 bg-zinc-50/60 p-4 text-foreground sm:p-8 dark:bg-zinc-950/30">
      <section className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-background shadow-xl shadow-zinc-200/30 dark:border-zinc-800 dark:shadow-none">
        <header className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50/50 px-6 py-7 sm:px-8 dark:border-zinc-800 dark:from-orange-950/30 dark:to-zinc-900">
          <span className="mb-3 inline-block rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-semibold text-orange-700 dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-300">ReviewUpdate</span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">리뷰 수정</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">남겨주신 리뷰를 다듬어 주세요. 저장하면 수정한 내용이 반영됩니다.</p>
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
            <section className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
              <header className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-5 py-3 dark:border-zinc-700 dark:bg-zinc-900">
                <h2 className="text-sm font-semibold">리뷰 사진</h2>
                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-950 dark:text-orange-300">최대 1장</span>
              </header>
              <div className="grid divide-y divide-zinc-200 md:grid-cols-2 md:divide-x md:divide-y-0 dark:divide-zinc-700">
                <div className="space-y-3 p-5">
                  <h3 className="text-sm font-semibold">현재 저장된 사진</h3>
                  {!form.fileName && <p className="text-sm text-zinc-500">저장된 첨부파일이 없습니다.</p>}
                  {form.fileName && (
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                      <p className="break-all">{form.fileName}</p>
                      <label className="flex cursor-pointer items-center gap-2 text-red-600 dark:text-red-400">
                        <input type="checkbox" checked={deletePhoto} onChange={handleDeletePhotoChange} className="h-4 w-4 accent-red-600" />
                        삭제
                      </label>
                    </div>
                  )}
                  {form.fileName && (form.fileType?.startsWith("image/") || /\.(png|jpe?g|gif|webp|avif|bmp|svg)$/i.test(form.fileName)) && (
                    <figure className="space-y-2">
                      {imageError ? (
                        <div role="status" className="flex h-30 w-30 items-center rounded-lg border border-zinc-300 p-3 text-center text-xs text-zinc-500 dark:border-zinc-700">이미지를 불러오지 못했습니다.</div>
                      ) : (
                        <Image
                          src={getReviewImageUrl(reviewId) + `&filename=${form.fileName}`}
                          alt={`기존 첨부 이미지: ${form.fileName}`}
                          width={120}
                          height={120}
                          unoptimized
                          onError={() => setImageError(true)}
                          className="h-30 w-30 rounded-lg border border-zinc-200 bg-zinc-50 object-contain dark:border-zinc-700 dark:bg-zinc-900"
                        />
                      )}
                      <figcaption className="text-xs text-zinc-500">기존 첨부 이미지 미리보기</figcaption>
                    </figure>
                  )}
                  {deletePhoto && <p role="status" className="text-sm text-red-600 dark:text-red-400">수정 저장을 누르면 현재 사진이 삭제됩니다. 체크를 해제하면 유지됩니다.</p>}
                </div>
                <div className="space-y-3 bg-orange-50/30 p-5 dark:bg-orange-950/10">
                  <h3 className="text-sm font-semibold">다른 사진으로 변경</h3>
                  <label className="block space-y-2">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">변경할 사진 1장을 선택해 주세요.</span>
                    {form.fileName &&
                      <span className="block text-xs leading-5 text-zinc-500">저장하면 현재 사진이 선택한 사진으로 교체됩니다.</span>
                    }
                    <input
                      ref={fileInput}
                      type="file"
                      onChange={handleAttachmentChange}
                      className="block w-full cursor-pointer text-sm text-zinc-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:font-semibold file:text-orange-700 file:shadow-sm hover:file:bg-orange-100 focus-visible:outline-2 focus-visible:outline-orange-500 dark:file:bg-zinc-800 dark:file:text-orange-300"
                    />
                  </label>
                  {attachment && (
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-3 text-sm dark:bg-zinc-800">
                      <p className="break-all">{attachment.name} ({(attachment.size / 1024).toFixed(1)} KB)</p>
                      <button
                        type="button"
                        onClick={handleAttachmentCancel}
                        className="rounded border border-zinc-300 px-2 py-1 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 dark:border-zinc-700 dark:hover:bg-zinc-800"
                      >변경 취소</button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </fieldset>
          {errorMessage && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">{errorMessage}</p>}
          <div className="flex justify-end gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <button type="button" disabled={isSaving} onClick={handleCancel} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800">취소</button>
            <button type="button" onClick={handleSave} disabled={isSaving} className="rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-wait disabled:opacity-50">{isSaving ? "저장 중..." : "수정 저장"}</button>
          </div>
        </div>
      </section>
    </main>
  );
}

function ReviewUpdateContent() {
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("reviewId");
  return <ReviewUpdateForm key={reviewId} reviewId={reviewId} />;
}

export default function ReviewUpdate() {
  return <Suspense fallback={<p className="p-4">불러오는 중...</p>}><ReviewUpdateContent /></Suspense>;
}
