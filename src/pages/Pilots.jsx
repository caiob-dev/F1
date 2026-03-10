import { AllPilots } from "../layout/AllPilots";
import { Main } from "../layout/Main";

export function Pilots () {
    return (
        <Main className="flex flex-col justify-center items-center py-7">
            <AllPilots/>
        </Main>
    )
}