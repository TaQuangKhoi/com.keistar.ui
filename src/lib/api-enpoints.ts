import {getBaseUrl} from "@/lib/axios-instance";

/**
 * NEXT_PUBLIC_BONITA_URL=http://localhost:{portNumber}/bonita
 */
const sessionApiUrl = getBaseUrl('/API/system/session/unusedId', window.location.hostname)

export {
    sessionApiUrl
}