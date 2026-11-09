"use client";

import { Suspense, useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { deleteReview, getReview, getReviewImage, getReviewImageUrl } from "@/apis/reviewApi";
import Image from "next/image";

function ReviewDetailContent() {
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("reviewId");

  return <ReviewDetailView key={reviewId} reviewId={reviewId} />;
}

function ReviewDetailView({ reviewId }) {
  const router = useRouter();
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const validId = /^[1-9]\d*$/.test(reviewId ?? "");

  useEffect(() => {
    if (!validId) return;
    let ignore = false;
    getReview(reviewId)
      .then((review) => {
        if (!ignore) setReview(review);
      })
      .catch((error) => {
        if (!ignore) {
          console.error("리뷰 상세 조회 실패:", error);
          setErrorMessage(error.response?.status === 404 ? "리뷰를 찾을 수 없습니다." : "리뷰를 불러오지 못했습니다.");
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });
    return () => { ignore = true; };
  }, [reviewId, validId]);

  const writtenAt = review?.writedAt ?? review?.date;
  const isImageAttachment = Boolean(review?.fileName) && (
    review?.fileType?.startsWith("image/")
    || /\.(png|jpe?g|gif|webp|avif|bmp|svg)$/i.test(review.fileName)
  );

  const handleDownload = async () => {
    if (isDownloading || !review) return;
    setIsDownloading(true);
    setDownloadError("");
    try {
      const blob = await getReviewImage(review.reviewId);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = review.fileName || `review-${review.reviewId}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      // 브라우저가 다운로드를 시작한 뒤 임시 URL을 해제합니다.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("첨부파일 다운로드 실패:", error);
      setDownloadError("파일을 다운로드하지 못했습니다. 다시 시도해 주세요.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = () => {
    deleteReview(reviewId)
      .then((res)=>{
        console.log(res)
        alert(res.message)
        router.push("/Ch08RestApi/Exam01Review")
      })
      .catch((error)=>{
        console.log(error)
      })
  }


  return (
    <main className="flex-1 bg-zinc-50/60 p-4 text-foreground sm:p-8 dark:bg-zinc-950/30">
      <section className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-background shadow-xl shadow-zinc-200/30 dark:border-zinc-800 dark:shadow-none">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50/50 px-6 py-5 sm:px-8 dark:border-zinc-800 dark:from-orange-950/30 dark:to-zinc-900">
          <h1 className="text-sm font-semibold tracking-wide text-orange-800 dark:text-orange-300">ReviewDetail · 리뷰 상세</h1>
          <span className="rounded-full border border-orange-200 bg-white/70 px-3 py-1 text-xs text-orange-700 dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-300">상품 사용 후기</span>
        </header>
        <div className="space-y-8 p-6 sm:p-8">
          {!validId ? (
            <p role="alert" className="text-red-600">올바른 리뷰 번호가 필요합니다.</p>
          ) : errorMessage ? (
            <p role="alert" className="text-red-600">{errorMessage}</p>
          ) : isLoading ? (
            <p role="status">리뷰를 불러오는 중입니다.</p>
          ) : !review ? (
            <p role="status">리뷰가 없습니다.</p>
          ) : (
            <article className="space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wider text-orange-600 dark:text-orange-400">리뷰 #{review.reviewId}</p>
                <h2 className="break-words text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{review.title}</h2>
              </div>
              <div className="grid gap-5 rounded-xl border border-zinc-100 bg-zinc-50/80 p-5 text-sm sm:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                <div className="block space-y-2">
                  <span className="text-xs text-zinc-500">작성자</span>
                  <div className="break-all font-semibold">{review.writer || "-"}</div>
                </div>
                <div className="block space-y-2">
                  <span className="text-xs text-zinc-500">상품 번호</span>
                  <div className="font-semibold">{review.productId ?? "-"}</div>
                </div>
                <div className="block space-y-2">
                  <span className="text-xs text-zinc-500">작성일</span>
                  <div className="font-medium">{writtenAt ? new Date(writtenAt).toLocaleString("ko-KR") : "-"}</div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">리뷰 내용</h3>
                <div className="min-h-48 whitespace-pre-wrap break-words text-base leading-8 text-zinc-700 dark:text-zinc-300">{review.content}</div>
              </div>
              <div className="space-y-4 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-sm font-semibold">첨부파일</h3>
                  <span className="min-w-0 break-all text-sm text-zinc-500">{review.fileName || review.filename || "첨부파일 없음"}</span>
                  {isImageAttachment && (
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="ml-auto rounded-lg border border-orange-200 px-3 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-orange-500 disabled:opacity-50 dark:border-orange-900 dark:text-orange-300 dark:hover:bg-orange-950/30"
                    >
                      {isDownloading ? "다운로드 중..." : "다운로드"}
                    </button>
                  )}
                </div>
                {downloadError && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{downloadError}</p>}
                {isImageAttachment && (
                  <figure className="space-y-2">
                    {imageError ? (
                      <div role="status" className="flex h-30 w-30 items-center rounded-lg border border-zinc-300 p-3 text-center text-xs text-zinc-500 dark:border-zinc-700">이미지를 불러오지 못했습니다.</div>
                    ) : (
                      <Image
                        src={getReviewImageUrl(review.reviewId) + `&filename=${review.fileName}`}
                        alt={`리뷰 첨부 이미지: ${review.fileName}`}
                        width={120}
                        height={120}
                        // unoptimized는 Next.js의 <Image>에서 이미지 최적화를 건너뛰는 옵션입니다.
                        unoptimized
                        loading="eager"
                        onError={() => setImageError(true)}
                        className="h-30 w-30 rounded-lg border border-zinc-200 bg-zinc-50 object-contain dark:border-zinc-700 dark:bg-zinc-900"
                      />
                    )}
                    <figcaption className="text-xs text-zinc-500">첨부 이미지 미리보기</figcaption>
                  </figure>
                )}
              </div>
            </article>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.push(`/Ch08RestApi/Exam01Review/ReviewUpdate?reviewId=${encodeURIComponent(reviewId)}`)}
                disabled={!review || isLoading || Boolean(errorMessage)}
                className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                수정하기
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={!review || isLoading || Boolean(errorMessage)}
                className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                삭제하기
              </button>
            </div>
            <Link
              href="/Ch08RestApi/Exam01Review"
              className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              목록으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ReviewDetail() {
  return (
    <Suspense fallback={<p className="p-4">불러오는 중...</p>}>
      <ReviewDetailContent />
    </Suspense>
  );
}
