import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Main } from "./layout/Main";

function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <Main className="flex-1">
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
