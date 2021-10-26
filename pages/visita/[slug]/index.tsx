import React from 'react'
import AquaClient from '../../../graphql/aquaClient'
import Head from 'next/head'
import { FunctionComponent } from 'react';
import { configuration } from '../../../configuration';
import { Streamer } from './../../../models/streamer';

interface Props {
    redirect: string
}

export const GET_BONUS_BY_SLUG = `
    query GET_BONUS_BY_SLUG($slug:String){
        bonuses(where:{ slug: $slug, country: {code:"it"}}){
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
        description
        legacyId
        circular_image{
            url
        }
        }   
    }
`

const index: FunctionComponent<Props> = ({ redirect }) => {

    console.log('redirecting to unibt')
    return (
        <div>
            <Head>
                <meta httpEquiv='refresh' content={`0.1;url=${redirect}`}></meta>
            </Head>
        </div>
    )
}

// unibet https://dspk.kindredplc.com/redirect.aspx?pid=5615153&bid=27508

const bonusQuery = `
query($compareCode:String="hello", $id : ID=1){
    streamer(id:$id){
      bonuses(where:  {compareCode:$compareCode}){
        name
        compareCode
        links{
          link
          label
        }
      }
    }
  }
`

export async function getServerSideProps({ query, res }) {


    const slug = query.slug as string

    let redirect

    const aquaClient = new AquaClient()

    console.log(`${slug} ${configuration.streamerName} it`)

    const links = await aquaClient.query({
        query : bonusQuery,
        variables : {
            compareCode : slug,
            id : configuration.streamerId,
            label : `${slug} ${configuration.streamerName} it`
        }
    })

    const link = links.data.data.streamer.bonuses[0].links.find(b => b.label === `${slug} ${configuration.streamerName} it`)

    



    // if (slug === 'starvegas') redirect = 'https://www.starvegas.it/gmg/refer/5ee3b2e8e32951000129f2d7'
    // if (slug === 'leovegas') redirect = 'https://ads.leovegas.com/redirect.aspx?pid=3660661&bid=14965'
    // if (slug === 'lottomatica') redirect = 'https://wllottomatica.adsrv.eacdn.com/C.ashx?btag=a_677b_1814c_&affid=552&siteid=677&adid=1814&c='
    // if (slug === 'admiralyes') redirect = 'http://wladmiralinteractive.adsrv.eacdn.com/C.ashx?btag=a_2559b_401c_&affid=827&siteid=2559&adid=401'
    
    return {
        props: {
            redirect : link.link
        }
    }
}

export default index
