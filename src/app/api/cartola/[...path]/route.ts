import { NextRequest, NextResponse } from 'next/server'

const CARTOLA_API_URL = 'https://api.cartola.globo.com'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params
    const resource = path.map(encodeURIComponent).join('/')
    const headers: Record<string, string> = { Accept: 'application/json' }

    if (path[0] === 'auth') {
        const glbId = process.env.GLBID

        if (!glbId) {
            return NextResponse.json({ error: 'GLBID não configurado' }, { status: 500 })
        }

        headers['X-GLB-Auth'] = 'oidc'
        headers.Authorization = `Bearer ${glbId}`
    }

    try {
        const response = await fetch(`${CARTOLA_API_URL}/${resource}${request.nextUrl.search}`, {
            headers,
            cache: 'no-store',
        })

        return new NextResponse(response.body, {
            status: response.status,
            headers: { 'Content-Type': response.headers.get('Content-Type') ?? 'application/json' },
        })
    } catch {
        return NextResponse.json({ error: 'Falha ao consultar a API do Cartola' }, { status: 502 })
    }
}
