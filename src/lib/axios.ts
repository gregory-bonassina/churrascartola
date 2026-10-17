import axios from 'axios'

// As requisições passam pelo route handler do Next (src/app/api/cartola), que injeta o token no servidor
export const apiCartola = axios.create({
    baseURL: '/api/cartola',
})

export const apiCartolaAuth = (url: string, headers: Record<string, string> = {}) => {
    return apiCartola.get(url, { headers })
}
