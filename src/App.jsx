import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Main } from "./layout/Main";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}

export default App;
