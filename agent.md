# Antigravity Agent Guidelines for Page Generation

이 문서는 본 프로젝트에서 홈페이지나 추가 웹 페이지를 생성할 때 에이전트가 기본적으로 준수해야 하는 레이아웃 및 디자인 가이드라인입니다.

## 기본 레이아웃 원칙

1. **상단 영역 (Top - Header & Title)**:
   - 페이지 최상단에는 항상 홈페이지의 제목(Title)이 직관적이고 크게 노출되어야 합니다.
   - 시각적 계층 구조를 위해 `<h1>` 태그를 활용하며, 브랜드명을 명확하게 명시합니다.

2. **중간 영역 (Middle - Content & Image)**:
   - 페이지 본문의 중앙(콘텐츠 영역)에는 주제를 시각적으로 나타낼 수 있는 핵심 **그림(이미지)**이 배치되어야 합니다.
   - 이미지는 반응형으로 스타일링하며, 화면 크기에 맞게 조절되어야 합니다.

3. **배경 테마 (Background)**:
   - 페이지 전체의 기본 배경색은 깔끔하고 밝은 **흰색 (`#ffffff`)**을 적용합니다.
   - 텍스트와 주요 아이콘은 흰색 배경 위에서 가독성을 확보할 수 있도록 어두운 톤(예: Charcoal, Dark Gray)으로 설계합니다.

---

## 코드 구현 템플릿 표준

에이전트는 새로운 웹페이지를 빌드할 때 아래 구조를 기본 골격으로 삼아 개발을 진행하십시오.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>기본 홈페이지</title>
    <style>
        /* 기본 배경색: 흰색 */
        body {
            background-color: #ffffff;
            color: #222222;
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }
        
        header {
            width: 100%;
            text-align: center;
            padding: 40px 0;
            border-bottom: 1px solid #eeeeee;
        }

        h1 {
            margin: 0;
            font-size: 2.5rem;
            color: #111111;
        }

        .content-area {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 20px;
            width: 100%;
            max-width: 800px;
        }

        .main-image {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
    </style>
</head>
<body>

    <!-- 1. 위에는 홈페이지 제목 -->
    <header>
        <h1>홈페이지 제목</h1>
    </header>

    <!-- 2. 중간에는 그림 -->
    <main class="content-area">
        <img class="main-image" src="assets/main_illustration.png" alt="대표 이미지">
    </main>

</body>
</html>
```
