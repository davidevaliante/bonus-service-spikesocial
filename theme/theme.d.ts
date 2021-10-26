// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string

        colors: {
            primary: string
            primaryDark: string
            secondary: string
            background: string
        }

        text: {
            primaryFont: string
        }

        brand: {
            icon: string
        }
    }
}
