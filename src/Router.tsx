import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'

import { Home } from './pages/Home'
import { Games } from './pages/Games'
import TopRankedPlayers from './pages/TopRankedPlayers'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/top-ranked-players" element={<TopRankedPlayers />} />
            </Route>
        </Routes>
    )
}
