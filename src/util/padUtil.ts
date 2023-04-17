export const padStart = function (target: string, targetLength: number, padString: string) {
    return target.padStart(targetLength, padString)
}

export const zeroPadStart = function (target: number | undefined) {
    return String(target).padStart(2, '0')
}
