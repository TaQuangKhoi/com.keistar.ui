export default interface KeistarItem {
    id?: number,
    links?: [
        {
            rel: string,
            href: string,
        }
    ],
}