import App from 'next/app'
import React, { FunctionComponent, Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import { styledTheme, GlobalStyle } from '../theme/theme'
import { Reset } from 'styled-reset'
import Head from 'next/head'
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import { materialTheme } from './../theme/theme';
import { useCountry } from '../hooks/useCountry'
import { countryContext } from '../context/CountryContext'
import { cookieContext } from '../context/CookieContext'
import { useMyCookies } from '../hooks/useMyCookies';


const ContextProvider: FunctionComponent = ({ children }) => {
    const currentCountry = useCountry()
    const cookieAcceptedStatus = useMyCookies()
    return (<Fragment>
        <countryContext.Provider value={currentCountry}>
            <cookieContext.Provider value={cookieAcceptedStatus}>
                {children}
            </cookieContext.Provider>
        </countryContext.Provider>
    </Fragment>)
}

class MyApp extends App {

    render() {
        const { Component, pageProps } = this.props
        return (
            <ContextProvider>
                <MaterialThemeProvider theme={materialTheme}>
                    <ThemeProvider theme={styledTheme}>
                        <Head>
                        </Head>
                        <Reset />
                        <GlobalStyle />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </MaterialThemeProvider>
            </ContextProvider>
        )
    }
}

export default MyApp