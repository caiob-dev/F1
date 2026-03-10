import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-primary py-5" role="contentinfo">
      <p className="text-center text-white text-[22px] font-titilium pb-3">
        Formula 1 by Caio © {year}
      </p>
      <div className="flex gap-5 justify-center">
        <a aria-label="Ir para GitHub do Caio"
          href="https://github.com/caiob-dev"
          target="_blank"
           rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <img className="w-11.25" src={github} alt="Caio's profile on GitHub" loading="lazy" />
           <span className="sr-only">GitHub do Caio</span>
        </a>
        <a aria-label="Ir para LinkedIn do Caio"
          href="https://www.linkedin.com/in/caio-bomfim-pantoja/"
          target="_blank"
           rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <img className="w-11.25" src={linkedin} alt="Caio's profile on LinkedIn" />
        </a>
      </div>
    </footer>
  );
}
