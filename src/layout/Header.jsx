import { Link } from "react-router-dom";
/* import rb21 from "../assets/rb21.png" */
import logo from "../assets/caio.png";
import { useState } from "react";

export function Header() {
  const year = new Date().getFullYear();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-primary flex justify-between items-center font-titilium w-full py-4 px-4 md:justify-around ">
      <img src={logo} className=" w-40 md:w-50" />
      <div className="flex text-white md:gap-7 items-center">
        <button
          className="md:hidden text-white text-[40px]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className="hidden md:flex gap-7 text-[22px] text-white">
          <Link
            to={"/"}
            aria-label="Ir para página de início"
            className="no-underline hover:text-fundo-amarelo"
          >
            Home
          </Link>
          <Link
            to={"/teams"}
            aria-label="Ir para página de construtores"
            className="no-underline hover:text-fundo-amarelo"
          >
            Construtores
          </Link>
          <Link
            to={"/pilots"}
            aria-label="Ir para página de pilotos"
            className="no-underline hover:text-fundo-amarelo"
          >
            Pilotos
          </Link>
          <Link
            to={"/calendar"}
            aria-label="Go to calendar page"
            className="no-underline hover:text-fundo-amarelo"
          >
            Calendário {year}
          </Link>
        </ul>

        {menuOpen && (
          <ul className="absolute top-32 left-0 w-full bg-blue-primary flex flex-col items-center gap-6 py-6 text-white md:hidden text-2xl">
            <Link
              to={"/"}
              aria-label="Ir para página de início"
              className="no-underline hover:text-fundo-amarelo"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={"/teams"}
              aria-label="Ir para página de construtores"
              className="no-underline hover:text-fundo-amarelo"
              onClick={() => setMenuOpen(false)}
            >
              Construtores
            </Link>
            <Link
              to={"/pilots"}
              aria-label="Ir para página de pilotos"
              className="no-underline hover:text-fundo-amarelo"
              onClick={() => setMenuOpen(false)}
            >
              Pilotos
            </Link>
            <Link
              to={"/calendar"}
              aria-label="Go to calendar page"
              className="no-underline hover:text-fundo-amarelo"
              onClick={() => setMenuOpen(false)}
            >
              Calendário {year}
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
}
