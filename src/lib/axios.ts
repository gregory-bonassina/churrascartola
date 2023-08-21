import axios from 'axios'

// const corsUrl = 'https://cors-anywhere.herokuapp.com/'
const corsUrl = import.meta.env.VITE_CORS

export const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export const apiCartola = axios.create({
    baseURL: `${corsUrl}https://api.cartolafc.globo.com`,
})
