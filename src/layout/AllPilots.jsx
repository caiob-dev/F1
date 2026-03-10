import { useEffect, useRef, useState } from "react";
import { http } from "../api/api";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function AllPilots() {
  const [pilots, setPilots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchedRef = useRef(false);

  const columns = [pilots?.slice(0, 11) || [], pilots?.slice(11) || []];

  useEffect(() => {
    if (fetchedRef.current) return;

    fetchedRef.current = true;

    async function getPilots() {
    try {
      const response = await http.get("2026/drivers");
      const allPilots = response?.data?.MRData?.DriverTable?.Drivers || [];
      setPilots(allPilots);
    } catch (error) {
      console.log("Erro ao acessar os pilotos", error);
      setError(true);
    } finally {
      setTimeout(() => setLoading(false),800);
    }
  }

    getPilots();
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
        <p>Failed to load Pilots 😥. Try again later!</p>
      </section>
    );
  }

  return (
    <section className="flex-col flex md:flex-row md:justify-between md:gap-6">
      {columns.map((column, i) => (
        <ul
          key={i}
          className="w-85 md:w-100 flex flex-col gap-2 bg-fundo-preto text-white my-8 rounded-2xl"
        >
          <li className="flex justify-between pt-2 px-3 rounded-t-2xl">
            <p className="font-titilium uppercase text-blue-400 font-bold text-[15px] md:text-[16px]">
              Pilots - Driver Number
            </p>

            <p className="font-titilium uppercase text-blue-400 font-bold text-[15px] md:text-[16px]">
              Informations
            </p>
          </li>

          {column.map((pilot) => (
            <li
              key={pilot.driverId}
              className="border-t border-gray-500 px-3 text-center pb-2.5"
            >
              <div className="flex justify-between pt-2.5">
                <div className="flex items-center">
                  <p className="font-titilium text-[15px] uppercase md:text-[16px]">
                    {pilot.givenName} {pilot.familyName}{" "}
                    {pilot?.permanentNumber ? pilot.permanentNumber : "NONE"}
                  </p>
                </div>

                <p className="font-titilium uppercase text-fundo-amarelo text-[15px] md:text-[16px]">
                  {pilot.nationality}
                </p>
              </div>

              <div className="flex justify-end">
                <a
                  href={pilot.url}
                  target="_blank"
                  className="font-titilium uppercase text-fundo-vermelho text-[15px] md:text-[16px] cursor-pointer hover:text-red-300 transition duration-300 ease-in-out "
                >
                  Click here
                </a>
              </div>
            </li>
          ))}
        </ul>
      ))}
    </section>
  );
}
