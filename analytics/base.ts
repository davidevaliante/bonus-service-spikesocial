import ReactGA from 'react-ga'

const davideId = 'UA-132810169-2'

export const initializeAnalytics = (pageName: string) => {
    ReactGA.initialize([
        {
            trackingId: davideId,
            gaOptions: {
                name: 'dev'
            }
        }
    ])

    ReactGA.ga('dev.send', 'pageview', { pageName })
}