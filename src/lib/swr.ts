import {fetcher} from "@/lib/utils";
import useSWR from "swr";

export function useSession() {
    const {data, error, isLoading} = useSWR(`http://localhost:28071/bonita/API/system/session/unusedId`, fetcher)

    return {
        session: data,
        isLoading,
        isError: error
    }
}