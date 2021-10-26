import { useState, useCallback } from 'react'
import { CountryContext, SupportedCountries } from '../context/CountryContext'
import { DEFAULT_COUNTRY } from '../context/CountryContext';

export const useCountry = (): CountryContext => {
    const [country, setCountry] = useState<SupportedCountries>(DEFAULT_COUNTRY)

    const setCurrentCountry = useCallback((updatedCountry: SupportedCountries): void => {
        setCountry(updatedCountry)
    }, [])

    return {
        currentCountry: country,
        setCurrentCountry
    }
}