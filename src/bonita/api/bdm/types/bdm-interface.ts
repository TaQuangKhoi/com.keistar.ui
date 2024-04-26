export default interface BdmInterface {
    "persistenceId": number,
    "persistenceId_string": string,
    "persistenceVersion": number,
    "persistenceVersion_string": string,
    links?: [
        {
            "rel": string,
            "href": string
        }
    ]
}