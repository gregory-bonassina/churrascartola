import { differenceInSeconds, intervalToDuration } from 'date-fns'
import { Timer } from 'phosphor-react'
import { useEffect, useState } from 'react'

interface MarketStateCountdownProps {
    closeMarketTimestamp: number
}

export function MarketStateCountdown({ closeMarketTimestamp }: MarketStateCountdownProps) {
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const closeMaketDateTime = closeMarketTimestamp * 1000

    const duration = intervalToDuration({
        start: 0,
        end: amountSecondsPassed * 1000,
    })

    const zeroPad = (num: number | undefined) => String(num).padStart(2, '0')

    const formattedDate = [duration.hours, duration.minutes, duration.seconds].map(zeroPad).join(':')

    const formattedDateWithDays = `${duration.days ? duration.days : 0}D ${formattedDate}`

    useEffect(() => {
        const interval = setInterval(() => {
            const dateNow = new Date()
            const dateMarketClose = new Date(closeMaketDateTime)

            const secondsDifference = differenceInSeconds(dateNow, dateMarketClose)

            if (dateNow.getTime() <= dateMarketClose.getTime()) {
                setAmountSecondsPassed(secondsDifference)
            } else {
                setAmountSecondsPassed(0)
                clearInterval(interval)
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [closeMaketDateTime])

    return (
        <span>
            <Timer size={24} />
            {formattedDateWithDays}
        </span>
    )
}
