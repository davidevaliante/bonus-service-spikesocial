// my-styledTheme.ts
import { DefaultTheme } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';
import {configuration} from '../configuration'

const appPrimaryColor = configuration.primaryColor
const appPrimaryDarkColor = '#34c970'
const appSecondaryColor = configuration.secondaryColor
const appTerziaryColor = '#f5b042'
const appFourthColor = '#20e378'
const appFifthColor = '#b5099b'
const appYellow = '#fcca4c'
const yellowDark = '#f5b71b'

export const appTheme: AppTheme = {
    borderRadius: '5px',

    colors: {
        primary: appPrimaryColor,
        primaryDark: appPrimaryDarkColor,
        secondary: appSecondaryColor,
        terziary: appTerziaryColor,
        fourth: appFourthColor,
        fifth: appFifthColor,
        yellow: appYellow,
        yellowDark: yellowDark,
        background: '#212121'
    },

    text: {
        primaryFont: configuration.font,
    },

    brand: {
        icon: '/icons/app_icon.svg'
    }
}

export interface AppTheme {
    borderRadius: string

    colors: {
        primary: string
        primaryDark: string
        secondary: string
        terziary: string
        fourth: string
        fifth: string
        yellow: string,
        yellowDark: string
        background: string
    }

    text: {
        primaryFont: string
    }

    brand: {
        icon: string
    }
}


export const styledTheme: StyledTheme = {
    borderRadius: '5px',

    colors: {
        primary: appPrimaryColor,
        primaryDark: appPrimaryDarkColor,
        secondary: appSecondaryColor,
        terziary: appTerziaryColor,
        fourth: appFourthColor,
        fifth: appFifthColor,
        yellow: appYellow,
        yellowDark: yellowDark,
        background: '#212121'
    },

    text: {
        primaryFont: configuration.font,
        secondaryFont: configuration.font,
        color: '#1f1f1f'
    },

    brand: {
        icon: '/icons/app_icon.svg'
    }

}

export interface StyledTheme {
    borderRadius: string

    colors: {
        primary: string
        primaryDark: string
        secondary: string,
        terziary: string,
        fourth: string
        fifth: string
        yellow: string,
        yellowDark: string,
        background: string
    }

    text: {
        primaryFont: string,
        secondaryFont: string,
        color: string
    }

    brand: {
        icon: string
    }
}

export const GlobalStyle = createGlobalStyle`
    body{
        height: 100%;
        width: 100%;
        color : '#363636';
        font-family : ${configuration.font}, sans-serif;
    }

    h1{
        color : black;
    }

    a{
        text-decoration : none;
    }


    /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`

export const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main: appPrimaryColor
        },
        secondary: {
            main: appSecondaryColor
        },
    },
    typography: {
        fontFamily: [
            '"Raleway"',
        ].join(','),
    },
});

