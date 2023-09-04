# 원티드 프리온보딩 12th 2주차 개인 과제

원티드 프리온보딩 12th 2주차에 진행된 개인 과제입니다.

본 과제는 특정 깃헙 레파지토리([github issue](https://github.com/facebook/react/issues))의 이슈 목록과 상세 내용을 확인하는 서비스를 구축하는 것이 목표입니다.

## 🧑🏻‍💻 프로젝트 정보

### 실행 방법
배포 링크: https://read-github-issues.netlify.app/
- 사이트에 접속할 수 없는 경우, 아래 명령어를 차례대로 입력하여 실행해주세요.

```jsx
git clone https://github.com/devsomda/wanted-pre-onboarding-week-2
npm install
npm start
```

### 프로젝트 구조

```jsx
src
 ┣ api
 ┃ ┣ instance.tsx
 ┃ ┗ request.tsx
 ┣ components
 ┃ ┣ common
 ┃ ┃ ┣ Header.tsx
 ┃ ┃ ┣ IssueCard.tsx
 ┃ ┃ ┗ Loading.tsx
 ┃ ┣ hooks
 ┃ ┃ ┗ useObserver.tsx
 ┃ ┗ IssueList
 ┃ ┃ ┗ AdImage.tsx
 ┣ constants
 ┃ ┗ index.tsx
 ┣ contexts
 ┃ ┗ IssueContext.tsx
 ┣ pages
 ┃ ┣ Error.tsx
 ┃ ┣ IssueDetail.tsx
 ┃ ┣ IssueList.tsx
 ┃ ┗ Routers.tsx
 ┣ types
 ┃ ┗ Issues.tsx
 ┣ App.tsx
 ┗ index.tsx
```

### 사용 라이브러리

```jsx
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.43",
    "@types/react": "^18.2.21",
    "@types/react-dom": "^18.2.7",
    "axios": "^1.4.0",
    "octokit": "^3.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^8.0.7",
    "react-router-dom": "^6.15.0",
    "react-scripts": "5.0.1",
    "styled-components": "^6.0.7",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },

  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@typescript-eslint/parser": "^5.62.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^14.0.1",
    "prettier": "^3.0.2"
  },
```

## 요구사항
### 필수 사항
- 이슈 목록 및 상세 화면 기능 구현
- 데이터 요청 중 로딩 표시
- 에러 화면 구현
- 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시

### 선택 사항
- CSS-in-JS 적용

## 📝 구현 내용

### ✅ Assignment 1

이슈 목록 화면을 구현해주세요

- 이슈 목록 가져오기 API 활용
- open 상태의 이슈 중 코멘트가 많은 순으로 정렬
- 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
- 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩 (Infinite Scroll)
- 다섯번째 셀마다 광고 이미지 출력
  - 광고 이미지 클릭 시 https://www.wanted.co.kr/ 로 이동
  
![infinite-scroll-image](https://github.com/devsomda/wanted-pre-onboarding-week-2/assets/109324517/90311d5a-bcae-48ef-ac4a-35c20301f644)

※ Infinite Scroll
`<InfinitScrollPoint id={INFINITE_SCROLL_STANDARD} />`List 페이지의 최하단 div를 기준으로, useObserver를 등록하였습니다.



### ✅ Assignment 2

이슈 상세 화면을 구현해주세요

- 이슈의 상세 내용 표시
- ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시
![image](https://github.com/devsomda/wanted-pre-onboarding-week-2/assets/109324517/93589bc3-124b-455f-89da-701333f80d83)



