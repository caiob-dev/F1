import { useEffect, useRef, useState } from "react";
import { http } from "../api/api";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function Standings() {
  
  const year = new Date().getFullYear();
  
  const [driverstandings, setDriverstandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const standingsRef = useRef(false);

  useEffect(() => {
    if(standingsRef.current) return;
    standingsRef.current = true;

    async function fetchStandings() {
    try {
      const [driversRes, constructorRes] = await Promise.all([
        http.get("2026/driverStandings"),
        http.get("2026/constructorStandings"),
      ]);

      const drivers =
        driversRes?.data?.MRData?.StandingsTable?.StandingsLists[0]
          ?.DriverStandings || [];

      const constructors =
        constructorRes?.data?.MRData?.StandingsTable?.StandingsLists[0]
          ?.ConstructorStandings || [];

      setDriverstandings(drivers);
      setConstructorStandings(constructors);
    } catch (error) {
      console.log("Erro ao acessar tabela do campeonato", error);
      setError(true);
    } finally {
      setTimeout(() => setLoading(false), 800)
    }
  }
  
    fetchStandings();
  }, []);

  if (loading) {
    return (
      <section className="min-h-dvh flex flex-col justify-start text-2xl text-white">
       <LoadingSpinner/>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-dvh flex flex-col justify-start text-[18px] md:text-2xl text-fundo-vermelho">
        <p>Failed to load standings 😥. Try again later!</p>
      </section>
    );
  }

  return (
    <section className=" md:w-162.5 flex flex-col items-center justify-center px-2">
      <h1 className="font-titilium uppercase text-2xl md:text-3xl pb-3 text-white">
        Standings 🏆
      </h1>
     {/*  <h2 className="font-titilium uppercase text-[14px] pb-3 text-fundo-vermelho text-center">
        *the new season standings will update, after the first race of {year}*
      </h2> */}
      <div className="flex justify-center pt-4 gap-2 bg-fundo-preto rounded-t-2xl px-2">
        <h2 className="font-titilium uppercase text-[16px] md:text-[18px] pb-3 text-fundo-vermelho text-center">
          {year} season{" "}
        </h2>
      </div>
      <div className="flex justify-around py-2 md:py-5 gap-3 text-[17.5px] bg-fundo-preto rounded-3xl px-3 md:px-6 md:gap-5">
        <ul className="text-white ">
          {constructorStandings.map((cs) => {
            return (
              <li
                key={cs.Constructor?.constructorId}
                className="border-b border-b-gray-500 py-2 font-titilium text-[16px]"
              >
                <span className="text-blue-400">{cs.position}- </span>
                <span className="md:uppercase">{cs.Constructor.name} - </span>
                <span className="text-fundo-amarelo ">{cs.points}</span>{" "}
                <span className="text-white">{cs.points <= 1 ? "point" : "points"}</span>
              </li>
            );
          })}
        </ul>
        <ul className="text-white">
          {driverstandings.map((ds) => {
            return (
              <li
                key={ds.Driver?.driverId}
                className="  border-b border-b-gray-500 py-2 text-[16px]"
              >
                <span className="text-blue-400">{ds.position}- {/* {ds.Driver.givenName} */} </span>
                <span className="md:uppercase">{ds.Driver.familyName} -{" "} </span>
                <span className="text-fundo-amarelo">{ds.points}</span>{" "}
                <span className="text-white">{ds.points <= 1 ? "point" : "points"}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
