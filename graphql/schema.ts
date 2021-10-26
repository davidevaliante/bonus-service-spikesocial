export interface Bonus {
    id: number
    description: string
    backgroundColor: string
    borderColor: string
    link: string
    name: string
    noDeposit: string
    withDeposit: string
    rating: number
    tips: string
    country: SupportedCountry
    legacyId: string
    bonusCompareLink: string
    slug: string
    acceptedPayments: { methodName: string }[]
    bonus_guide?: {
        slug: string
    }
    circular_image: {
        url: string
    },
    spainLink: string
}

export interface SupportedCountry {
    id: number
    code: string
    name: string
    englishName: string
    getAllBonuses: Bonus[]
}