import {proxy} from 'valtio'

export const store = proxy({
    token: '',
    counter: 0,
})