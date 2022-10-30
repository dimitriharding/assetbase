// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

// 2. Import the Saas UI theme
import { theme as baseTheme } from '@saas-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    // teal primary color
    primary: {
        50: '#e6fffa',
        100: '#b2f5ea',
        200: '#81e6d9',
        300: '#4fd1c5',
        400: '#38b2ac',
        500: '#319795',
        600: '#2c7a7b',
        700: '#285e61',
        800: '#234e52',
        900: '#1d4044',
    },

}

export const theme = extendTheme({
    colors, config: {
        initialColorMode: 'dark',
    }
}, baseTheme)
