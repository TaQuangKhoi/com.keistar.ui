/**
 * NEXT_PUBLIC_BONITA_URL=http://localhost:{portNumber}/bonita
 */
const sessionApiUrl = process.env.NEXT_PUBLIC_BONITA_URL + '/API/system/session/unusedId';

export {
    sessionApiUrl
}