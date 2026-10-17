'use client'

import { ReactNode } from 'react'
import { Header } from '../../components/Header'

import { LayoutContainer } from './styles'
import { MarketState } from '../../components/MarketState'

export function DefaultLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <MarketState />
            <LayoutContainer>{children}</LayoutContainer>
        </>
    )
}
