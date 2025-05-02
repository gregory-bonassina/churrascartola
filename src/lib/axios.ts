import axios from 'axios'

// const corsUrl = 'https://cors-anywhere.herokuapp.com/'
const corsUrl = import.meta.env.VITE_CORS

export const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export const apiCartola = axios.create({
    baseURL: `${corsUrl}https://api.cartola.globo.com`,
})

export const apiCartolaAuth = (url: string, headers: Record<string, string> = {}) => {
    return apiCartola.get(url, {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'X-GLB-Auth': 'oidc',
            'Authorization': `Bearer ${import.meta.env.VITE_GLBID}`,
        },
    });
}
