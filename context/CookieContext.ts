import { createContext } from 'react'

export interface CookieContext {
    cookiesAccepted: boolean
    updateCookiesAccepted: (updateCookiestatus: boolean) => void
}


export const DEFAULT_COOKIE_ACCEPTED = false


// build CONTEXT
export const CookieContextDefaultValue: CookieContext = {
    cookiesAccepted: false,
    updateCookiesAccepted: (updateCookiestatus: boolean) => { }
}

export const cookieContext = createContext<CookieContext>(CookieContextDefaultValue)