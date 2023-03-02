import React, { FunctionComponent, useEffect, useContext } from 'react'
import AquaClient from './../../graphql/aquaClient'
import { BONUSES_BY_NAME, STREAMER_BY_ID } from './../../graphql/queries/bonus'
import { Bonus } from '../../graphql/schema'
import styled from 'styled-components'
import { tablet } from '../../components/Responsive/Breakpoints'
import { initializeAnalytics } from './../../analytics/base'
import { cookieContext } from '../../context/CookieContext'
import CookieDisclaimer from '../../components/CookieDisclaimer/CookieDisclaimer'
import VideoDiscalimer from '../../components/VideoDisclaimer/VideoDisclaimer'
import BonusStripe from '../../components/BonusStripe/BonusStripe'
import { Streamer, StreamerBonus } from './../../models/streamer'
import { configuration } from '../../configuration'
import axios from 'axios'
import Router from 'next/router'
import lowerCase from 'lodash/lowerCase'
import { useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import FullPageLoader from './../../components/FullPageLoader'
import Wrapper from '../../components/Layouts/Wrapper'
import Container from '../../components/Layouts/Container'

interface Props {
	streamerData: Streamer
	bonusToShow: string[]
}

const Compare: FunctionComponent<Props> = ({ streamerData, bonusToShow }) => {
	const aquaClient = new AquaClient()

	const [country, setCountry] = useState<string | undefined>(undefined)
	const [bonuses, setBonuses] = useState<StreamerBonus[] | undefined>(
		undefined
	)
	const [all, setAll] = useState([''])

	useEffect(() => {
		geoLocate()
		// getList()
	}, [])

	const getList = async () => {
		const data = await aquaClient.query({
			query: `
                query{
                    bonuses(sort:"name:asc"){
                        id
                        name
                    }
                }

            `,
			variables: {},
		})
		const k = data.data.data.bonuses.map(b => `${b.id} - ${b.name}`)
		console.log(k)
		setAll(k)
	}

	const geoLocate = async () => {
		const userCountryRequest = await axios.get(configuration.geoApi)
		const countryCode = lowerCase(userCountryRequest.data.country_code2)
		getBonusByName()
		if (countryCode) setCountry(countryCode)
	}

	const getBonusByName = () => {
		const streamerBonuses = streamerData.bonuses
		const placeholder: StreamerBonus[] = []

		console.log(streamerBonuses)

		const remappedBonusToShow = [...bonusToShow]

		// betflag == 47 admiral == 33

		if (remappedBonusToShow.includes('btflg')) {
			const indexToRemove = remappedBonusToShow.indexOf('btflg')

			if (!remappedBonusToShow.includes('wincsn')) {
				remappedBonusToShow.splice(indexToRemove, 1, 'wincsn')
			} else {
				remappedBonusToShow.splice(indexToRemove, 1, 'admiral')
			}
		}

		remappedBonusToShow.forEach(bonusCode => {
			const b = streamerBonuses.find(b => b.compareCode === bonusCode)
			if (b) placeholder.push(b)
		})

		setBonuses(placeholder)
		console.log(placeholder, 'bonus to show')
	}

	const openWebsite = () => window.open('https://www.spikeslot.com')

	if (!country) return <FullPageLoader />
	return (
		<Wrapper>
			<Container>
				<div
					className='top-bar'
					style={{ cursor: 'pointer' }}
					onClick={() => openWebsite()}
				>
					<img className='logo' src='/icons/app_icon.png' />
				</div>

				{country === 'it' && (
					<div
						style={{
							backgroundColor: '#f5f5f5',
							paddingRight: '30px',
							paddingLeft: '30px',
							paddingTop: '10px',
							textAlign: 'center',
							fontSize: '11px',
							color: '#666',
						}}
					>
						Queste sono informazioni atte a riconoscere e comparare
						siti di gioco legale nel tuo paese. Ricordati che al
						gioco alla lunga si perde, perchè i giochi con vincite
						sono concepiti per restituire alla lunga una percentuale
						inferiore a quella giocata, quindi se nella singola
						partita può capitare di vincere, alla lunga è
						praticamente impossibile. Se decidi di procedere, sappi
						che stai rischiando di perdere i tuoi soldi.
					</div>
				)}

				<div
					style={{
						position: 'fixed',
						bottom: '0',
						left: '0',
						backgroundColor: 'red',
						width: '100%',
						padding: '10px 0px',
						zIndex: 100,
					}}
				>
					<div
						style={{
							color: 'white',
							fontWeight: 'bold',
							fontSize: '.8rem',
							textAlign: 'center',
						}}
					>
						Migliori casinò legali dove trovare questi giochi:
					</div>
				</div>

				{bonuses &&
					bonuses.length > 2 &&
					bonuses.map((bonus: StreamerBonus) => (
						<BonusStripe
							key={`${bonus.name}`}
							bonus={bonus}
							countryCode={country}
						/>
					))}

				{bonuses &&
					bonuses.length <= 2 &&
					streamerData.bonuses.map((bonus: StreamerBonus) => (
						<BonusStripe
							key={`${bonus.name}`}
							bonus={bonus}
							countryCode={country}
						/>
					))}

				<div style={{ padding: '1rem' }}>
					<VideoDiscalimer />
				</div>
				{/* <div className='bottom'>
                    <p style={{textAlign : 'center'}}>This service is provided by <a href='https://www.topaffiliation.com'>Top Affiliation</a></p>
                </div> */}
			</Container>
		</Wrapper>
	)
}

export async function getServerSideProps({ query }) {
	const pickedBonus = query.options

	const aquaClient = new AquaClient()

	const bonusToShow = pickedBonus.split('-')

	const streamer = await axios.get(
		`${configuration.api}/streamers/${configuration.streamerId}`
	)

	return {
		props: {
			streamerData: streamer.data as Streamer,
			bonusToShow: bonusToShow,
		},
	}
}

export default Compare
