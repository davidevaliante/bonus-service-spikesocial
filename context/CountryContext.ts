import { createContext } from 'react'

export interface CountryContext {
    currentCountry: SupportedCountries
    setCurrentCountry: (updateCountry: SupportedCountries) => void
}

export enum SupportedCountries {
    ITALIA = 'it',
    REGNO_UNITO = 'gb',
    MONTENEGRO = 'me',
    CANADA = 'ca',
    SERBIA = 'rs',
    NEW_ZELAND = 'nz',
    ROW = 'row',
    UNKNOWN = 'unknown_country'
}

export const DEFAULT_COUNTRY = SupportedCountries.ITALIA


export const countryCodeToString = (code: SupportedCountries) => {
    switch (code) {
        case 'it':
            return 'ITALIA'
        case 'gb':
            return 'REGNO UNITO'
        case 'me':
            return 'MONTENEGRO'
        case 'ca':
            return 'CANADA'
        case 'rs':
            return 'SERBIA'
        case 'nz':
            return 'NEW_ZELAND'
        case 'row':
            return 'REST_OF_THE_WORLD'
        case 'unknown_country':
            return 'UNKNOWN_COUNTRY'
        default:
            return 'ITALIA'
    }
}

export const countryCodeToEnum = (code: string): SupportedCountries => {
    switch (code) {

        case 'it':
            return SupportedCountries.ITALIA
        case 'gb':
            return SupportedCountries.REGNO_UNITO
        case 'me':
            return SupportedCountries.MONTENEGRO
        case 'ca':
            return SupportedCountries.CANADA
        case 'rs':
            return SupportedCountries.SERBIA
        case 'nz':
            return SupportedCountries.NEW_ZELAND
        case 'row':
            return SupportedCountries.ROW
        case 'unknown_country':
            return SupportedCountries.UNKNOWN
        default:
            return SupportedCountries.ITALIA
    }
}


// build CONTEXT
export const CountryContextDefaultValue: CountryContext = {
    currentCountry: SupportedCountries.UNKNOWN,
    setCurrentCountry: (updatedCountry: SupportedCountries) => { }
}

export const countryContext = createContext<CountryContext>(CountryContextDefaultValue)