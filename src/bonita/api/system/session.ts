import {default as axios} from "@/lib/axios-instance";
import {sessionApiUrl} from "@/lib/api-enpoints";

async function getCurrentUserSession() {
  return await axios.get('/API/system/session/unusedId', {})
}

export {getCurrentUserSession}