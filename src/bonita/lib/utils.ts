declare const localStorage: any;

import {getCurrentUserSession} from "@/bonita/api/system/session";

function getBonitaAuthToken() {
    return localStorage.getItem('x-bonita-api-token');
}

function setBonitaAuthToken(token: string) {
    localStorage.setItem('x-bonita-api-token', token);
}

async function saveBonitaAuthToken() {
    const res = await getCurrentUserSession();
    const token = res.headers['x-bonita-api-token'];
    setBonitaAuthToken(token);
}

export {
    getBonitaAuthToken,
    setBonitaAuthToken,
    saveBonitaAuthToken,
}
