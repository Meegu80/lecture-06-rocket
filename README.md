# 🚀 SpaceX Archive Project

SpaceX의 로켓 데이터를 실시간으로 조회하고 상세 제원을 확인할 수 있는 React 기반 웹 어플리케이션입니다.

## 🛠 기술 스택

- **React 19**: 컴포넌트 기반 UI 라이브러리
- **TypeScript**: 안정적인 코드 작성을 위한 정적 타입 시스템
- **Vite**: 초고속 빌드 도구 및 개발 서버
- **React Router v7**: 유연한 클라이언트 사이드 라우팅
- **CSS Modules**: 유지보수가 용이한 컴포넌트 단위 스타일링

## 📂 프로젝트 구조 및 핵심 로직 설명

### 1. 라우팅 시스템 (`App.tsx`)

`react-router`를 사용하여 다중 페이지 내비게이션을 구현했습니다.

```tsx
// 핵심 라우팅 설정
<Routes>
    {/* 개별 로켓 상세 정보 페이지 */}
    <Route path={"/rocket/:id"} element={<Detail />} />
    {/* 로켓 목록 홈 페이지 */}
    <Route path={"/"} element={<Home />} />
</Routes>
```

### 2. 데이터 페칭 및 상태 관리 (`Home.tsx`)

`fetch` API와 React의 `useEffect`, `useState` 훅을 결합하여 비동기 데이터를 관리합니다.

- **상태 관리**: `loading` 상태를 통해 로딩 화면을 제어하고, `rockets` 배열에 API 결과값을 저장합니다.
- **비동기 통신**: 컴포넌트가 마운트될 때 SpaceX API(`v4/rockets`)를 호출합니다.

```tsx
useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
        .then(res => res.json())
        .then((data: Rocket[]) => {
            setRockets(data);
            setLoading(false);
        });
}, []);
```

### 3. 상세 정보 조회 (`Detail.tsx`)

URL 파라미터(`id`)를 활용하여 특정 데이터에 접근합니다.

- `useParams()` 훅을 사용하여 넘겨받은 `id`를 확보합니다.
- 해당 `id`를 엔드포인트에 포함해 (`/rockets/${id}`) 특정 로켓의 상세 데이터(이미지, 설명, 발사 비용 등)를 가져옵니다.

### 4. 컴포넌트 재사용성 (`RocketCard.tsx`)

목록 UI를 별도의 컴포넌트로 분리하여 가독성과 재사용성을 높였습니다.

```tsx
function RocketCard({ data }: { data: Rocket }) {
    return (
        <Link to={`/rocket/${data.id}`} className={styles.card}>
            <h3 className={styles.name}>{data.name}</h3>
            ...
        </Link>
    );
}
```

### 5. 가상 테마 및 스타일링 (CSS Modules)

- **CSS Modules**를 사용하여 클래스 이름 중복을 방지하고 컴포넌트와 스타일을 일대일로 매칭했습니다.
- **Glassmorphism & Dark Mode**: 미래지향적인 우주 테마를 연출하기 위해 반투명한 배경과 다크 모드 스타일을 적용했습니다.

---

이 프로젝트는 React의 가장 기본적인 흐름인 **"데이터 페칭 -> 상태 저장 -> UI 렌더링 -> 라우팅"**의 핵심 패턴을 충실히 따르고 있습니다.
