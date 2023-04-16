import { ReactNode } from 'react'
import { DefaultTableContainer, DefaultTableContent, Title } from './styles'

interface DefaultTableProps {
    children: ReactNode
    title?: string
}

export function DefaultTable({ children, title }: DefaultTableProps) {
    return (
        <DefaultTableContainer>
            {title && <Title>{title}</Title>}
            <DefaultTableContent>{children}</DefaultTableContent>
        </DefaultTableContainer>
    )
}
