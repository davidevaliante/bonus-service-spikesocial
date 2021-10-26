export interface Config {
    streamerId : string | number 
    streamerName : string
    api : string
    primaryColor : string
    secondaryColor : string
    fontString : string
    font : string
    youtubeMetatag? : string
    geoApi : string
}

export const configuration : Config = {
    streamerId : 6,
    streamerName : 'SPIKEYT',
    api : 'https://compare.topadsservices.com',
    primaryColor : '#db0d30',
    secondaryColor : '#db0d30',
    fontString : "https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap",
    font : 'Roboto',
    youtubeMetatag : 'M8eO4mYEdHHtKpSYgGOeXo-E-kFAfOmFMUwmaii2bkM',
    geoApi : 'https://api.ipgeolocation.io/ipgeo?apiKey=d9c8ca199b3f40fabc69dfdfefdc9aa2'
}

