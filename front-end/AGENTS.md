# 프로젝트 작업 지침

## 작업 범위와 소통

- 작업 범위는 `C:\gen-ai-course\projects\full-stack\front-end`로 제한합니다.
- 사용자가 별도로 요청하지 않으면 다른 프로젝트의 파일을 수정하지 않습니다.
- 설명과 작업 결과는 한글로 작성합니다.
- 기존 사용자 변경 사항을 보존하고, 요청한 작업에 필요한 부분만 수정합니다.

## 프로젝트 구성

- Next.js 16.4.3 App Router, React 19.3.0 기반의 JavaScript 프로젝트입니다.
- 스타일은 Tailwind CSS 4와 `app/globals.css`를 사용합니다.
- `app/page.js`: 홈 페이지입니다.
- `app/layout.js`: 공통 레이아웃, 글꼴 및 메타데이터를 정의합니다.
- `app/globals.css`: 전역 스타일과 테마 변수를 정의합니다.
- `public/`: 이미지 등 정적 파일을 보관합니다.
- `next.config.mjs`: Next.js 설정입니다. 기존 React Compiler 및 캐시 관련 설정을 고려합니다.
- `eslint.config.mjs`: ESLint 및 Next.js Core Web Vitals 규칙을 설정합니다.
- `jsconfig.json`: `@/*`를 프로젝트 루트 기준 경로로 연결합니다.

## 실행 및 검증

- 의존성 설치: `npm ci` (`package-lock.json` 기준)
- 개발 서버: `npm run dev`
- 정적 검사: `npm run lint`
- 프로덕션 빌드: `npm run build`
- 프로덕션 서버: 빌드 후 `npm run start`
- 현재 별도 테스트 명령은 없습니다. 코드 변경에 맞춰 정적 검사와 필요한 빌드를 수행하고, 화면 변경은 가능한 경우 브라우저에서 확인합니다.
- 문서만 수정한 경우 불필요한 빌드나 테스트는 실행하지 않습니다.
- 검증을 실행하지 못했거나 실패했다면 결과와 원인을 명시합니다.

## 구현 규칙

- 페이지를 생성하거나 경로를 변경할 때 `.agents/skills/add-learning-menu/SKILL.md`를 적용하여 `AppMenu`를 함께 갱신합니다.

- 앞으로 생성하거나 수정하는 페이지 컴포넌트와 UI 컴포넌트는 Card 형태로 표시합니다.
- Card는 헤더와 본문으로 구성하고, 헤더에는 해당 컴포넌트의 이름을 표시합니다.
- 컴포넌트의 실제 UI와 콘텐츠는 Card 본문에 배치합니다.
- Card 형태는 각 컴포넌트에 헤더와 본문 마크업을 직접 작성하여 구현합니다.
- 기존 코드처럼 2칸 들여쓰기, 큰따옴표, 세미콜론을 사용합니다.
- 기존 JavaScript 및 App Router 구조를 따릅니다. 요청 없이 TypeScript 전환이나 새로운 라이브러리 도입을 하지 않습니다.
- 서버 컴포넌트를 기본으로 사용하고, 브라우저 API나 상태 및 이벤트 처리가 필요한 컴포넌트에만 `"use client"`를 선언합니다.
- 스타일은 기존 Tailwind 유틸리티와 테마 변수를 우선 활용합니다.
- 화면 변경 시 반응형 배치, 의미 있는 HTML, 이미지 대체 텍스트, 키보드 접근성을 고려합니다.
- 의존성을 변경할 때는 `package.json`과 `package-lock.json`을 함께 관리합니다.
- 비밀 값은 소스에 작성하지 않습니다. `NEXT_PUBLIC_` 환경 변수는 브라우저에 공개되므로 비밀 값을 넣지 않습니다.
- `node_modules/`, `.next/`, `out/`, `build/` 등 생성 파일은 직접 수정하거나 커밋하지 않습니다. 기존 `.gitignore`를 유지합니다.

<!-- BEGIN:nextjs-agent-rules -->

## 설치된 Next.js 버전의 문서를 먼저 확인

이 버전에는 호환성을 깨는 변경이 있습니다. API, 관례 및 파일 구조가 기존 지식과 다를 수 있으므로 코드를 작성하기 전에 이 파일의 디렉터리를 기준으로 `node_modules/next/dist/docs/`에서 관련 가이드를 읽습니다. 사용 중단 안내도 확인합니다. 모노레포에서는 저장소 루트에서 `next` 패키지가 보이지 않을 수 있습니다.

이 블록은 `next dev`가 작성하고 다시 추가합니다. 관련 동작은 `node_modules/next/dist/server/lib/generate-agent-files.js`에서 확인할 수 있습니다. 변경 내역에서 블록을 제거해도 다시 생성될 수 있으므로, 관련 작업을 커밋할 때 함께 포함합니다.

<!-- END:nextjs-agent-rules -->
