import { useEffect, useRef, useState } from "react";
import { http } from "../api/api";

export function LastResult() {
  const [lastWinner, setLastWinner] = useState(null);
  const lastWinnerRef = useRef(false);
  
  useEffect(() => {
    if (lastWinnerRef.current) return;

    lastWinnerRef.current = true

    async function getLastWinner() {
      try {
        const response = await http.get("2026/last/results/");
        const lastWinner = response?.data?.MRData?.RaceTable?.Races[0];
        setLastWinner(lastWinner);
      } catch (error) {
        console.log("Erro ao buscar última corrida", error);
      } /*  finally {
        setTimeout(() => setLoading(false), 300);
      } */
    }

    getLastWinner();
  }, []);

  return (
    <section className="bg-fundo-preto rounded-2xl w-85 md:w-125 md:my-5 md:absolute md:top-40 md:left-5 lg:left-0 lg:top-0 lg:relative 2xl:left-5 2xl:top-40 2xl:absolute">
      <h1 className="py-1 text-center text-[26px] text-fundo-vermelho">
        Last Winner:
      </h1>
      <div className="text-white flex flex-col gap-1">
        {!lastWinner && (
          <p className="text-white">Loading races...</p>
        )}
        {/* {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          timeLeft && (
            <p>
              Starts in: {timeLeft.days}d {timeLeft.hours}h, {timeLeft.minutes}
              m, {timeLeft.seconds}s
            </p>
          )
        )} */}

        <div className="px-4">
          <h2 className="text-center text-[22px] font-titilium md:uppercase md:text-2xl">
            Round {lastWinner?.round} - {lastWinner?.raceName}
          </h2>
          <p className="text-center text-[22px] font-titilium md:uppercase md:text-2xl ">
            {lastWinner?.Results?.[0]?.Driver.givenName}{" "}
            {lastWinner?.Results?.[0]?.Driver.familyName}
          </p>
        </div>

        <div className="flex justify-between px-5 pb-4">
          <p className="text-blue-400 text-[20px] font-titilium">
            {lastWinner?.Results?.[0]?.Constructor.name}
          </p>
          <p className="text-fundo-amarelo text-[20px] font-titilium">
            {lastWinner?.date &&
              new Date(lastWinner.date + "T12:00:00").toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </section>
  );
}
