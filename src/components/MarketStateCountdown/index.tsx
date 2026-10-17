'use client'

import { differenceInSeconds } from 'date-fns'
import { TimerIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

interface MarketStateCountdownProps {
    closeMarketTimestamp: number
}

export function MarketStateCountdown({ closeMarketTimestamp }: MarketStateCountdownProps) {
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const closeMaketDateTime = closeMarketTimestamp * 1000

    const zeroPad = (num: number) => String(num).padStart(2, '0')

    const days = Math.floor(amountSecondsPassed / 86400)
    const hours = Math.floor((amountSecondsPassed % 86400) / 3600)
    const minutes = Math.floor((amountSecondsPassed % 3600) / 60)
    const seconds = amountSecondsPassed % 60

    const formattedDateWithDays = `${days}D ${[hours, minutes, seconds].map(zeroPad).join(':')}`

    useEffect(() => {
        const updateCountdown = () => {
            const dateNow = new Date()
            const dateMarketClose = new Date(closeMaketDateTime)

            if (dateNow.getTime() <= dateMarketClose.getTime()) {
                setAmountSecondsPassed(differenceInSeconds(dateMarketClose, dateNow))
                return true
            }

            setAmountSecondsPassed(0)
            return false
        }

        if (!updateCountdown()) {
            return
        }

        const interval = setInterval(() => {
            if (!updateCountdown()) {
                clearInterval(interval)
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [closeMaketDateTime])

    return (
        <span>
            <TimerIcon size={24} />
            {formattedDateWithDays}
        </span>
    )
}
