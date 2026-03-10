import { useEffect, useRef, useState } from "react";
import { http } from "../api/api";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function AllConstructors() {
  const [constructors, setConstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const constructorsRef = useRef(false);

  useEffect(() => {
    if (constructorsRef.current) return;

    constructorsRef.current = true;

    async function getTeams() {
      try {
        const response = await http.get("2026/constructors");
        const allConstructors =
          response.data.MRData.ConstructorTable.Constructors;
        setConstructors(allConstructors);
      } catch (error) {
        console.log("Erro ao acessar os times", error);
        setError(true);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    }

    getTeams();
  }, []);

  if (loading) {
    return (
      <section className="min-h-dvh flex flex-col justify-start text-2xl text-white pb-3.5">
        <LoadingSpinner />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-dvh flex flex-col justify-start text-2xl text-fundo-vermelho">
        <p>Failed to load Constructors 😥. Try again later!</p>
      </section>
    );
  }

  return (
    <section className="w-full px-3 md:w-137.5">
      <ul className="flex flex-col gap-2 bg-fundo-preto text-white my-8 rounded-2xl">
        <li className=" flex justify-between pt-2 px-3 rounded-t-2xl">
          <p className="font-titilium uppercase text-blue-400 font-bold">
            Constructors
          </p>
          {/* <h2 className="font-titilium uppercase text-blue-400 font-bold">Nationality</h2> */}
          <p className="font-titilium uppercase text-blue-400 font-bold">
            Informations
          </p>
        </li>
        {constructors.map((team) => {
          return (
            <li
              key={team.constructorId}
              className=" border-t border-gray-500 px-3 text-center pb-2.5"
            >
              <div className="flex justify-between pt-2.5">
                <p className=" font-titilium uppercase">{team.name}</p>
                <p className=" font-titilium uppercase text-fundo-amarelo ">
                  {" "}
                  {team.nationality}
                </p>
              </div>
              <div className="flex justify-end">
                <a
                  href={team.url}
                  target="_blank"
                  className="font-titilium uppercase text-fundo-vermelho cursor-pointer hover:text-red-300 hover:transition duration-300 ease-in-out"
                >
                  Click here
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
