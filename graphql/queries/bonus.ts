export const BONUSES_BY_NAME = `
query BONUS_BY_NAME($names:[String]=["StarCasinò","Starvegas", "888 Casino"], $countryCode:String="it"){
    bonuses(
      where:{
        country :{code:$countryCode}
        name_in: $names
      }
    ){
        id
        name
        country{
          code
        }
        bonus_guide{
          slug
        }
        rating
        bonusCompareLink
        withDeposit
        noDeposit
        backgroundColor
        borderColor
        link
        description
        legacyId
        spainLink
        circular_image{
            url
        }
    }
  }
`

export const STREAMER_BY_ID = `
query STREAMER_DATA($id:ID=1){
  streamer(id:$id){
    alias
    bonuses{
      name
      circularImage{
        url
      }
      noDepositDescription{
        country{
          countryCode
        }
        description
      }
      withDepositDescription{
        country{
          countryCode
        }
        description
      }
      links{
        country{
          countryCode
        }
        link
      }
      compareCode
      borderColor
      rating      	
    }
  }
}
`