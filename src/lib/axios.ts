import axios from 'axios'

// const corsUrl = 'https://cors-anywhere.herokuapp.com/'
const corsUrl = 'http://localhost:8080/'

export const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export const apiCartola = axios.create({
    baseURL: `${corsUrl}https://api.cartolafc.globo.com`,
})
