'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeaderContainer, HeaderContent } from './styles'

import logoImg from '../../assets/logo.png'

const links = [
    { href: '/', title: 'Home', label: 'Home' },
    { href: '/games', title: 'Games', label: 'Jogos' },
    { href: '/top-ranked-players', title: 'Games', label: 'Mais escalados' },
]

export function Header() {
    const pathname = usePathname()

    const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

    return (
        <HeaderContainer>
            <HeaderContent>
                <Image src={logoImg} alt="" priority />
                <nav>
                    {links.map(({ href, title, label }) => (
                        <Link key={href} href={href} title={title} className={isActive(href) ? 'active' : undefined}>
                            {label}
                        </Link>
                    ))}
                </nav>
            </HeaderContent>
        </HeaderContainer>
    )
}
