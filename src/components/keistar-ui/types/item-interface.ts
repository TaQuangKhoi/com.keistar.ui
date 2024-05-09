import LinkInterface from "@/bonita/api/types/link-interface";

export default interface KeistarItem {
    persistenceId?: number,
    persistenceId_string?: string,
    id?: number,
    links?: LinkInterface[],
}