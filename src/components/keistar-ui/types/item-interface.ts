export default interface KeistarItem {
    persistenceId?: number,
    persistenceId_string?: string,
    id?: number,
    links?: [
        {
            rel: string,
            href: string,
        }
    ],
}