import { BrowserRouter, Route, Routes } from "react-router";
import Detail from "./pages/Detail.tsx";
import Home from "./pages/Home.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/rocket/:id"} element={<Detail />} />
                <Route path={"/"} element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
