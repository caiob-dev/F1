import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { http } from "../api/api";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function Card() {
  const [corridas, setCorridas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const nextRaceRef = useRef(false);

  useEffect(() => {
    if(nextRaceRef.current) return;

    nextRaceRef.current = true;

    async function getCircuits() {
    try {
      const response = await http.get("2026/races");
      const corridas = response?.data?.MRData?.RaceTable?.Races;
      setCorridas(corridas);
    } catch (error) {
      console.log("Erro ao acessar corridas", error);
      setError(true);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  }

    getCircuits();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex flex-col justify-start text-2xl text-white">
       <LoadingSpinner/>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex flex-col justify-start text-2xl text-fundo-vermelho">
        <p>Failed to load calendar 😥. Try again later!</p>
      </section>
    );
  }
  return (
    <section className="max-w-300">
      <ul className="flex justify-center flex-wrap gap-8 ">
        {corridas.map((race) => {
          return (
            <li
              key={race.round}
              className=" flex flex-col bg-fundo-card w-83 md:w-87.5 h-full rounded-2xl pb-3"
            >
              <div className="flex items-center bg-blue-400 rounded-t-2xl">
                <p className="text-white text-[28px] bg-fundo-vermelho py-1 px-3 rounded-l-2xl  rounded-b border-none m-0">
                  R{race.round}
                </p>

                <div className="flex-1">
                  <h1 className=" text-[19px] text-fundo-amarelo font-semibold mx-0 pl-5">
                    {race.raceName.toUpperCase()}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col items-center my-0 mx-auto gap-2">
                <p className=" text-black font-bold italic">
                  Race:{" "}
                  {race?.date &&
                    new Date(race.date + "T12:00:00").toLocaleDateString(
                      "pt-BR",
                    )}{" "}
                </p>

                <p className="text-blue-400 font-bold">
                  {race?.Sprint?.date
                    ? `Sprint: ${new Date(race.Sprint.date + "T00:00:00").toLocaleDateString("pt-BR")}`
                    : "No sprint race"}
                </p>

                <p className="  text-black font-bold">
                  {race.Circuit.Location.locality},{" "}
                  {race.Circuit.Location.country}
                </p>
                <p className=" text-blue-400 font-bold">
                  {race.Circuit.circuitName.toUpperCase()}
                </p>
                <div className=" p-2 flex justify-center bg-fundo-vermelho rounded-xl hover:bg-red-500 hover:transition duration-300 ease-in-out">
                  <Button href={race.url} target="_blank" className="text-white cursor-pointer">
                    Informations
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
