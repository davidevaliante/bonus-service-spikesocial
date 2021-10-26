
export class Streamer {
    constructor(
        public alias : string,
        public bonuses : StreamerBonus[],
        public countryBonusList : {
            label : string,
            bonuses : StreamerBonus[],
            
        }[]
    ){}
}

export class StreamerBonus{
    constructor(
        public name : string,
        public circularImage : {
            url : string
        },
        public noDepositDescription : {
            country : {
                countryCode : string, 
            },
            description : string,
            label : string
        }[],
        public withDepositDescription : {
            country : {
                countryCode : string, 
            },
            description : string,
            label : string
        }[],
        public links:{
            country : {
                countryCode : string, 
            },
            link : string,
            label : string
        }[],
        public compareCode : string,
        public borderColor : string,
        public rating : number,
        public id?: number
    ){}
}