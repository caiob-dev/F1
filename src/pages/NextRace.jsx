import { useEffect, useRef, useState } from "react";
import { http } from "../api/api";

export function NextRace() {
  const [nextRace, setNextRace] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const nextRaceRef = useRef(false);

  useEffect(() => {
    if (nextRaceRef.current) return;

    nextRaceRef.current = true

    async function getNextRace() {
      try {
        const response = await http.get("current/races");
        const races = response?.data?.MRData?.RaceTable?.Races || [];
        const upcomingRace = races.find(
          (race) => new Date(race.date) > new Date(),
        );
        setNextRace(upcomingRace);
      } catch (error) {
        console.log("Erro ao buscar próxima corrida", error);
      }
    }

    getNextRace();
  }, []);

  useEffect(() => {
    if (!nextRace) return;

    const interval = setInterval(() => {
      const raceDay = new Date(
        `${nextRace.date}T${nextRace.time ?? "00:00:00"}`,
      ).getTime();

      const now = new Date().getTime();

      const difference = raceDay - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [nextRace]);

  return (
    <section className="bg-fundo-preto rounded-2xl w-85 md:w-125 md:my-5 lg:right-0 lg:top-0 lg:relative 2xl:right-5 2xl:top-40 2xl:absolute">
      <h1 className="py-1 text-center text-[26px] text-fundo-vermelho">
        Next Race:
      </h1>
      <div className="text-white flex flex-col gap-1">
        {!nextRace && (
          <p className="text-white text-center">Loading races...</p>
        )}
    
        <div className="px-4">
          <h2 className=" text-center text-[22px] font-titilium md:uppercase md:text-2xl ">
            Round {nextRace?.round} - {nextRace?.raceName}
          </h2>

          <p className="text-center text-[22px] font-titilium md:uppercase md:text-2xl ">
            {nextRace?.Circuit.Location.locality},{" "}
            {nextRace?.Circuit.Location.country}
          </p>
        </div>

        <div className="flex flex-col px-5 pb-4 items-center md:flex md:flex-row md:justify-between">
          <p className="text-blue-400 text-[20px] font-titilium">
            Starts in: {timeLeft?.days}d {timeLeft?.hours}h {timeLeft?.minutes}m{" "}
            {timeLeft?.seconds}s
          </p>
          <p className="text-fundo-amarelo text-[20px] font-titilium">
            {nextRace?.date &&
              new Date(nextRace.date + "T12:00:00").toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </section>
  );
}
