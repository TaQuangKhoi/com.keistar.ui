import {default as axios} from "@/lib/axios-instance";
import {sessionApiUrl} from "@/lib/api-enpoints";

function getCurrentUserSession() {
  return axios.get(sessionApiUrl, {})
}

export {getCurrentUserSession}