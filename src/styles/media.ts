import { css } from 'styled-components'
import { Interpolation, RuleSet, Styles } from 'styled-components/dist/types'

const device = {
    xs: '400px',
    sm: '600px',
    md: '900px',
    lg: '1280px',
    xl: '1440px',
    xxl: '1920px',
}

interface MediaQueryFn {
    (styles: Styles<object>, ...interpolations: Interpolation<object>[]): RuleSet<object>
}

interface Media {
    xs: MediaQueryFn
    sm: MediaQueryFn
    md: MediaQueryFn
    lg: MediaQueryFn
    xl: MediaQueryFn
    xxl: MediaQueryFn
}

export const media: Media = {
    xs: (...args) => css`
        @media (max-width: ${device.xs}) {
            ${css(...args)};
        }
    `,
    sm: (...args) => css`
        @media (max-width: ${device.sm}) {
            ${css(...args)};
        }
    `,
    md: (...args) => css`
        @media (max-width: ${device.md}) {
            ${css(...args)};
        }
    `,
    lg: (...args) => css`
        @media (max-width: ${device.lg}) {
            ${css(...args)};
        }
    `,
    xl: (...args) => css`
        @media (max-width: ${device.xl}) {
            ${css(...args)};
        }
    `,
    xxl: (...args) => css`
        @media (max-width: ${device.xxl}) {
            ${css(...args)};
        }
    `,
}
