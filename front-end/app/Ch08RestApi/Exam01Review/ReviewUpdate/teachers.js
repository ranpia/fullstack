"use client";

import { getReview, updateReview } from "@/apis/reviewApi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function ReviewUpdateForm() {
    // ReviewDetail이 보낸 데이터 받기
    const reviewId = useSearchParams().get("reviewId");
    const [errors, setErrors] = useState({});
    // DOM 참조: <input type="file">
    const fileInputRef = useRef(null);
    const titleInputRef = useRef(null);
    const contentInputRef = useRef(null);
    // 사용자가 선택한 파일 이름을 저장하는 상태
    const [selectedFileName, setSelectedFileName] = useState("");
    // ReviewDetail로 돌아가기 위한 경로
    const detailUrl = `/Ch08RestAPI/Exam01Review/ReviewDetail?reviewId=${reviewId}`;
    const router = useRouter();

    const validateTitle = (value) => {
        if (!value.trim()) return "제목을 입력해 주세요.";
        if (value.length > 200) return "제목은 200자 이하로 입력해 주세요.";
        return "";
    };

    const validateContent = (value) => {
        return value.trim() ? "" : "내용을 입력해 주세요.";
    };

    // 입력 양식과 연결되는 상태 정의
    const [updateForm, setUpdateForm] = useState({
        title:"",
        content:""
    });

    useEffect(() => {
        const work = async () => {
            try {
                const response = await getReview(reviewId);
                setUpdateForm({ response });
            } catch (error) {

            }
        }
        work();

    }, [reviewId])

    //title과 content가 변경될 때 상태를 변경하는 함수
    const handleChange = (event) => {
        setUpdateForm({...updateForm, [event.target.name]:event.target.value})
    }

    // 제출 버튼을 클릭했을 때 호출
    const handleSubmit = async () => {
        // 유효성 검사
        const nextErrors = {
            title: validateTitle(titleInputRef.current.value),
            content: validateContent(contentInputRef.current.value),
        };
        setErrors(nextErrors);
        const firstInvalidField = Object.keys(nextErrors).find((name) => nextErrors[name]);
        if (firstInvalidField) {
            (firstInvalidField === "title" ? titleInputRef : contentInputRef).current.focus();
            return;
        }

        // 작업
        const formData = new FormData();
        formData.append("reviewId", reviewId);
        formData.append("title", updateForm.title);
        formData.append("content", updateForm.content);
        if (fileInputRef.current.files.length === 1) {
            formData.append("file", fileInputRef.current.files[0]);
        }
        try {
            await updateReview(formData);
            router.push(detailUrl);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <section className="min-w-0 w-full rounded-lg border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
            <header className="rounded-t-lg border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-700 dark:bg-zinc-800">
                <h2 className="font-semibold">ReviewUpdate</h2>
            </header>
            <div className="bg-zinc-50/60 p-4 sm:p-6 dark:bg-zinc-950/30">
                <div className="mx-auto max-w-[800px]">
                    <div className="mb-5 flex items-start justify-between gap-3">
                        <div className="border-l-4 border-orange-500 pl-4">
                            <p className="text-xs font-semibold tracking-widest text-orange-600 dark:text-orange-400">EDIT REVIEW</p>
                            <h3 className="mt-1 text-xl font-bold">상품 후기 수정</h3>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">사용하면서 달라진 생각이나 새로운 이야기를 더해 보세요.</p>
                        </div>
                        {updateForm &&
                            <span className="shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">#{reviewId || "-"}</span>
                        }
                    </div>
                    {updateForm &&
                        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                            <dl className="flex flex-wrap gap-x-8 gap-y-2 rounded-lg bg-zinc-50 px-4 py-3 text-xs dark:bg-zinc-800/50">
                                <div className="flex gap-2"><dt className="text-zinc-500">글쓴이</dt><dd className="font-semibold">{`: ${updateForm.writer}`}</dd></div>
                                <div className="flex gap-2"><dt className="text-zinc-500">상품 번호</dt><dd className="font-semibold">{`: ${updateForm.productId}`}</dd></div>
                            </dl>
                            <div>
                                <label htmlFor="title" className="mb-1 block text-sm font-semibold">제목</label>
                                <input value={updateForm.title} ref={titleInputRef} id="title" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "title-error" : undefined} name="title" required maxLength={200} placeholder="후기를 한 줄로 요약해 주세요" className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-zinc-600 dark:bg-zinc-800 dark:focus:ring-orange-900/40" />
                                {errors.title && <p id="title-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.title}</p>}
                            </div>
                            <div>
                                <label htmlFor="content" className="mb-1 block text-sm font-semibold">내용</label>
                                <textarea value={updateForm.content} ref={contentInputRef} id="content" aria-invalid={Boolean(errors.content)} aria-describedby={errors.content ? "content-error" : undefined} name="content" required rows={6} placeholder="상품에 대한 솔직한 후기를 남겨 주세요" className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-6 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-zinc-600 dark:bg-zinc-800 dark:focus:ring-orange-900/40" />
                                {errors.content && <p id="content-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.content}</p>}
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="min-w-0 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
                                    <h4 className="mb-2 text-sm font-semibold">현재 파일</h4>
                                    <div className="flex items-center justify-between gap-2">
                                        <p aria-live="polite" className="min-w-0 break-all text-xs text-zinc-500 dark:text-zinc-400">
                                            {updateForm.fileName ? updateForm.fileName : "첨부파일이 없습니다."}
                                        </p>
                                    </div>
                                </div>
                                <div className="min-w-0 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-800/40">
                                    <h4 className="mb-2 text-sm font-semibold">📎 첨부파일 변경</h4>
                                    <input ref={fileInputRef} id="file" name="file" type="file" hidden onChange={(event) => setSelectedFileName(event.target.files[0]?.name || "")} />
                                    <div className="flex min-w-0 items-center gap-2">
                                        <button type="button" onClick={() => fileInputRef.current?.click()} className="shrink-0 rounded-lg border border-orange-200 bg-white px-3 py-1.5 text-xs font-semibold text-orange-600 hover:bg-orange-50 dark:border-orange-900 dark:bg-zinc-800 dark:text-orange-300 dark:hover:bg-zinc-700">
                                            선택
                                        </button>
                                        <span aria-live="polite" className="min-w-0 break-all text-xs text-zinc-500 dark:text-zinc-400">{selectedFileName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                <Link href={detailUrl} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800">취소</Link>
                                <button type="button" onClick={handleSubmit} className="rounded-lg bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-orange-600">수정 저장</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default function ReviewUpdate() {
    return <Suspense fallback={<p className="p-4 text-sm">수정 화면을 준비하고 있습니다…</p>}><ReviewUpdateForm /></Suspense>;
}
