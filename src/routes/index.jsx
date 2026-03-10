import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { Calendar } from "../pages/Calendar";
import { Pilots } from "../pages/Pilots";
import { Constructors } from "../pages/Constructors";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="teams" element={<Constructors />} />
          <Route path="pilots" element={<Pilots />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
