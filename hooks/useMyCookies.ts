import { useState, useCallback, useEffect } from 'react'
import { CountryContext, SupportedCountries } from '../context/CountryContext'
import { DEFAULT_COUNTRY } from '../context/CountryContext';
import { CookieContext } from '../context/CookieContext';
import { useCookies } from 'react-cookie'

export const useMyCookies = (): CookieContext => {

    const [cookies, setCookie, removeCookie] = useCookies(['accepted']);
    const [cookieAcceptedStatus, setCookiesAccepted] = useState<boolean>(false)

    useEffect(() => {
        if (cookies.accepted) setCookiesAccepted(true)
        else setCookiesAccepted(false)
    }, [cookies])

    const updateCookiesAccepted = useCallback((updatedCookieStatus: boolean): void => {
        if (updatedCookieStatus === true) {
            setCookie('accepted', true, {
                maxAge: 60 * 60 * 24 * 365
            })
            setCookiesAccepted(updatedCookieStatus)
        } else {
            setCookie('accepted', false, {
                maxAge: 60 * 60 * 24 * 365
            })
            setCookiesAccepted(true)
        }
    }, [])

    return {
        cookiesAccepted: cookieAcceptedStatus,
        updateCookiesAccepted
    }
}