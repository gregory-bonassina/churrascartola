import { ReactNode } from 'react'
import { DefaultTableContainer } from './styles'

interface DefaultTableProps {
    children: ReactNode
}

export function DefaultTable({ children }: DefaultTableProps) {
    return <DefaultTableContainer>{children}</DefaultTableContainer>
}
