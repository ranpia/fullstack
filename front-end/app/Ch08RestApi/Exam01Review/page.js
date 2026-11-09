"use client";

import { useEffect, useState } from "react";
import { listReviews } from "@/apis/reviewApi";
import Link from "next/link";

export default function Exam01Review() {
  const [reviews, setReviews] = useState([]);
  const [pager, setPager] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => { // 비동기 함수는 useEffect 매개변수 자리에 올수 없다
    const controller = new AbortController();

    const loadReviews = async () => {
      try {
        const data = await listReviews(
          { pageNo: pageNo, rowsPerPage: 10 },
          { signal: controller.signal },
        );
        if (!controller.signal.aborted) {
          setReviews(data.list);
          setErrorMessage("");
          setPager(data.pager)
          console.log("게시글 목록:", data.list);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("게시글 목록 조회 실패:", error);
          setErrorMessage("게시글 목록을 불러오지 못했습니다.");
        }
      }
    };

    // 방법2
    // listReviews(
    //   { pageNo: 1, rowsPerPage: 10 },
    //   { signal: controller.signal }
    // ).then((data) => {
    //   if (!controller.signal.aborted) {
    //     console.log("게시글 목록:", data.list);
    //   }
    // })
    //   .catch((error) => {
    //     if (!controller.signal.aborted) {
    //       console.error("게시글 목록 조회 실패:", error);
    //     }
    //   });

    loadReviews();
    return () => controller.abort();
  }, [pageNo]);

  return (
    <main className="flex-1 p-4 text-foreground sm:p-8">
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
        <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-1 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">Exam01Review</h1>
        </header>
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="min-w-0 leading-6">게시판 REST API 연동을 학습하는 페이지입니다.</p>
            <Link
              href="/Ch08RestApi/Exam01Review/CreateReview"
              className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 active:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              글쓰기
            </Link>
          </div>
          {errorMessage && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>}
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">게시글 목록</caption>
              <thead className="bg-zinc-100 dark:bg-zinc-900">
                <tr>
                  {["번호", "제목", "작성자", "작성일", "상품 ID", "첨부파일"].map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className={`${label === "제목" ? "w-full" : "w-px whitespace-nowrap"} px-3 py-3 font-semibold`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {reviews.map((review) => (
                  <tr key={review.reviewId} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="w-px whitespace-nowrap px-3 py-3">{review.reviewId}</td>
                    <td title={review.title} className="w-full px-3 py-3 font-medium">
                      <Link
                        href={{ pathname: "/Ch08RestApi/Exam01Review/ReviewDetail", query: { reviewId: review.reviewId } }}
                        className="rounded hover:text-orange-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 dark:hover:text-orange-400"
                      >
                      {Array.from(review.title ?? "").length > 30
                        ? `${Array.from(review.title).slice(0, 30).join("")}...`
                        : review.title}
                      </Link>
                    </td>
                    <td className="w-px whitespace-nowrap px-3 py-3">{review.writer}</td>
                    <td className="w-px whitespace-nowrap px-3 py-3">
                      {review.date ? new Date(review.date).toLocaleDateString("ko-KR") : "-"}
                    </td>
                    <td className="w-px whitespace-nowrap px-3 py-3">{review.productId}</td>
                    <td className="w-px whitespace-nowrap px-3 py-3">
                      {review.fileName ? <span role="img" aria-label="첨부파일 있음">✅</span> : "-"}
                    </td>
                  </tr>
                ))}
                {reviews.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-zinc-500">
                      {errorMessage || (pager ? "등록된 게시글이 없습니다." : "목록 조회 중입니다.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <p>전체 {pager?.totalRows ?? 0}건</p>
            <p>{pager?.pageNo ?? 1} / {Math.max(pager?.totalPageNo ?? 0, 1)} 페이지</p>
          </div>
          {pager && pager.totalPageNo > 0 && (
            <nav aria-label="게시글 페이지 이동" className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                disabled={pageNo == 1}
                onClick={() => setPageNo(1)}
                aria-label="첫 페이지"
                title="첫 페이지"
                className="rounded border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="m11 7-5 5 5 5m7-10-5 5 5 5" />
                </svg>
              </button>
              <button
                type="button"
                disabled={pager.startPageNo <= 1}
                onClick={() => setPageNo(pager.startPageNo - 1)}
                aria-label="이전 페이지 그룹"
                title="이전 페이지 그룹"
                className="rounded border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="m15 6-6 6 6 6" />
                </svg>
              </button>
              {pager.pageArray.map((page) => (
                <button
                  key={page}
                  type="button"
                  aria-current={pageNo === page ? "page" : undefined}
                  onClick={() => setPageNo(page)}
                  className="min-w-10 rounded border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 aria-[current=page]:border-orange-600 aria-[current=page]:bg-orange-600 aria-[current=page]:text-white dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={pager.endPageNo >= pager.totalPageNo}
                onClick={() => setPageNo(pager.endPageNo + 1)}
                aria-label="다음 페이지 그룹"
                title="다음 페이지 그룹"
                className="rounded border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
              <button
                type="button"
                disabled={pageNo == pager.totalPageNo}
                onClick={() => setPageNo(pager.totalPageNo)}
                aria-label="마지막 페이지"
                title="마지막 페이지"
                className="rounded border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="m6 7 5 5-5 5m7-10 5 5-5 5" />
                </svg>
              </button>
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
