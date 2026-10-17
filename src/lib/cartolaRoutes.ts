// Fonte única das rotas do Cartola. Toda rota que começa com "auth/" é autenticada
// e passa a ser permitida automaticamente no route handler (src/app/api/cartola).
export const CARTOLA_ROUTES = {
    mercadoStatus: 'mercado/status',
    atletasPontuados: 'atletas/pontuados',
    atletasMercado: 'atletas/mercado',
    partidas: 'partidas/:rodada',
    time: 'time/id/:timeId',
    timeSubstituicoes: 'time/substituicoes/:timeId',
    mercadoDestaques: 'auth/mercado/destaques',
    liga: `auth/liga/${process.env.NEXT_PUBLIC_LIGA}`,
} as const

type RouteName = keyof typeof CARTOLA_ROUTES
type RouteParams = Record<string, string | number>

export const cartolaPath = (name: RouteName, params: RouteParams = {}) =>
    CARTOLA_ROUTES[name].replace(/:(\w+)/g, (_, key: string) => encodeURIComponent(String(params[key])))

const AUTH_PATTERNS = Object.values(CARTOLA_ROUTES)
    .filter((pattern) => pattern.startsWith('auth/'))
    .map((pattern) => pattern.split('/'))

export const isAllowedAuthPath = (path: string[]) =>
    AUTH_PATTERNS.some(
        (pattern) =>
            pattern.length === path.length && pattern.every((part, i) => part.startsWith(':') || part === path[i]),
    )
