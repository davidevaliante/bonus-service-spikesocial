import React, { FunctionComponent, useEffect, useContext } from 'react'
import AquaClient from './../../../../graphql/aquaClient';
import { BONUSES_BY_NAME } from './../../../../graphql/queries/bonus';
import { Bonus } from '../../../../graphql/schema';
import styled from 'styled-components';
import { tablet } from '../../../../components/Responsive/Breakpoints';
import { initializeAnalytics } from './../../../../analytics/base';
import { cookieContext } from '../../../../context/CookieContext';
import CookieDisclaimer from '../../../../components/CookieDisclaimer/CookieDisclaimer';
import VideoDiscalimer from '../../../../components/VideoDisclaimer/VideoDisclaimer';
import BonusStripe from '../../../../components/BonusStripe/BonusStripe';
import axios from 'axios'
import lowerCase from 'lodash/lowerCase'
import GeoVideoDiscalimer from './../../../../components/VideoDisclaimer/GeoVideoDisclaimer';

interface Props {
    data: any,
    country: string
}

const GEO_BONUS = `
query GEO_BONUSES($slug :String){
    geoLinks(where:{
      slug: $slug
    }){
      slug
      orderedBonusList{
        supported_country{
          code
        }
        bonusList{
        
          bonus{
            id
            name
            country{
              code
            }
            bonus_guide{
              slug
            }
            rating
            withDeposit
            noDeposit
            backgroundColor
            borderColor
            link
            bonusCompareLink
            description
            legacyId
            spainLink
            circular_image{
                url
            }
          }
        }
      }
    }
  }
`

const Compare: FunctionComponent<Props> = ({ data, country }) => {

    let bonuses
    let remappedCountry = country
    console.log(data.orderedBonusList)
    const match = data.orderedBonusList.filter(list => list.supported_country.code === country)[0]
    if (match) bonuses = match.bonusList
    else {
        bonuses = data.orderedBonusList.filter(list => list.supported_country.code === 'row')[0].bonusList
        remappedCountry = 'row'
    }
    const mainBonus = bonuses[0].bonus
    const auxiliaries = bonuses.filter(b => b.bonus.name !== mainBonus.name)

    return (
        <Wrapper>
            <Container>

                <div className='top-bar'>
                    <img className='logo' src='/icons/slot_colored.svg' />
                </div>

                <h1>Top Casino choice for this Slot Machine</h1>

                <BonusStripe eng={true} bonus={bonuses[0].bonus} countryCode={remappedCountry} />

                <h1>You can also find this slot here:</h1>
                {auxiliaries.map(b => <BonusStripe eng={true} key={`${b.bonus.name}`} bonus={b.bonus} countryCode={remappedCountry} />)}

                <div style={{ padding: '1rem' }}>
                    <GeoVideoDiscalimer isFromItaly={country === 'it'} />
                </div>
            </Container>
        </Wrapper>
    )

}

const Wrapper = styled.div`
        background : #e0e0e0;
        min-height : 100vh;
`

const Container = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    background : #f2f2f2;


    .top-bar{
        display : flex;
        flex-direction : column;
        justify-content : center;
        max-height : 100px;
        background: ${(props) => props.theme.colors.primaryDark};
    }

    .logo{
        height : 100px;
        margin : 0rem auto;
    }

    h1{
        font-family : ${(props) => props.theme.text.secondaryFont};
        color : ${(props) => props.theme.colors.primary};
        padding : 1rem;
        text-align : center;
        font-size : 1.5rem;
    }

    ${tablet}{
        max-width : 1200px;
        margin : 0rem auto;
    }
`

export async function getServerSideProps({ query }) {

    const country = query.country
    const slug = query.slug

    const pickedBonus = query.options
    const videoId = query.vid

    const aquaClient = new AquaClient()

    const request = await aquaClient.query({
        query: GEO_BONUS,
        variables: {
            slug: slug
        }
    })


    return {
        props: {
            data: request.data.data.geoLinks[0],
            country
        }
    }
}

export default Compare
