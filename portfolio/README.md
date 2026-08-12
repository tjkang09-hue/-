# 강태준 포트폴리오 웹사이트

PRD(`포트폴리오_PRD_강태준.md`)를 기반으로 개발된 정적 웹사이트입니다.

## 폴더 구조

```
portfolio/
├── index.html          # 페이지 구조 (직접 수정할 일 거의 없음)
├── css/style.css        # 디자인(색상, 글꼴, 레이아웃)
├── js/main.js            # data 폴더의 내용을 화면에 그려주는 스크립트
├── data/
│   ├── achievements.json # 히어로 섹션 핵심 성과 배지 5개
│   ├── competencies.json # 핵심 역량 8개
│   ├── projects.json     # 대표 프로젝트 카드 6개
│   └── experience.json   # 경력 타임라인 (기본 노출 5개사 + 전체보기 8건)
└── assets/
    ├── resume.pdf         # 이력서 PDF (다운로드 버튼에 연결됨)
    └── profile.png         # 프로필 사진 (히어로 아바타에 사용됨)
```

**콘텐츠(문구, 프로젝트, 경력)를 수정할 때는 `data/` 폴더의 json 파일만 편집하면 됩니다.**
`index.html`이나 `js/main.js`를 건드릴 필요가 없습니다 — PRD의 "지속적 보완 개발 가능한 구조" 원칙을 그대로 구현한 부분입니다.

## 지금 해야 할 일

1. 전화번호·이메일 등 노출 정보가 맞는지 `index.html`과 `data/achievements.json`을 확인해주세요.
2. 이력서 PDF나 프로필 사진을 교체하고 싶다면 `assets/resume.pdf`, `assets/profile.png` 파일을 같은 이름으로 덮어써주세요.

## 로컬에서 미리 보기

이 사이트는 `data/*.json`을 `fetch`로 불러오는 방식이라, **파일을 더블클릭해서 바로 열면 콘텐츠가 보이지 않을 수 있습니다** (브라우저 보안 정책 때문). 아래 중 하나로 로컬 서버를 띄운 뒤 확인해주세요.

```bash
# 방법 1: Node.js가 있다면
npx serve

# 방법 2: Python이 있다면
python3 -m http.server
```

이후 브라우저에서 `http://localhost:3000` (또는 안내되는 주소)로 접속하면 됩니다.
**Vercel이나 GitHub Pages에 배포하면 이 문제 없이 바로 정상적으로 보입니다.**

## 배포 방법 (PRD 5장 기술 스택 기준)

### Vercel (추천)
1. [vercel.com](https://vercel.com)에 가입 후 로그인
2. "Add New Project" → 이 `portfolio` 폴더를 업로드하거나 GitHub 저장소로 연결
3. 별도 설정 없이 "Deploy" 클릭 (정적 사이트라 빌드 명령 불필요)

### GitHub Pages
1. GitHub에 새 저장소를 만들고 `portfolio` 폴더 내용을 업로드
2. 저장소 Settings → Pages → Branch를 `main`, 폴더를 `/ (root)`로 설정
3. 몇 분 후 `https://[계정명].github.io/[저장소명]` 주소로 접속 가능

## 다음 단계 (PRD 7장 참고)

- 문의 폼을 실제로 동작시키고 싶다면 Formspree 같은 무료 서버리스 폼 서비스 연동을 추가할 수 있습니다 (현재는 이메일 링크 방식).
- 추천사, 기술 블로그, 다국어 지원, 다크모드는 2차 확장 항목입니다.
