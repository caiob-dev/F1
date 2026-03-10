import { Main } from "../layout/Main";
import { LastResult } from "./LastResult";
import { NextRace } from "./NextRace";
import { Standings } from "./Standings";

export function Home() {
  return (
    <>
       <Main className="flex gap-5 flex-col justify-center items-center py-10"> 
        <NextRace />
        <LastResult/> 
        <Standings/> 
      </Main>
    </>
  );
}
