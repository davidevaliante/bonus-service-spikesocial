import React, { FunctionComponent, useEffect, useContext } from 'react'
import AquaClient from '../../../graphql/aquaClient'
import { BONUSES_BY_NAME, STREAMER_BY_ID } from '../../../graphql/queries/bonus'
import { Bonus } from '../../../graphql/schema'
import styled from 'styled-components'
import { tablet } from '../../../components/Responsive/Breakpoints'
import { initializeAnalytics } from '../../../analytics/base'
import { cookieContext } from '../../../context/CookieContext'
import CookieDisclaimer from '../../../components/CookieDisclaimer/CookieDisclaimer'
import VideoDiscalimer from '../../../components/VideoDisclaimer/VideoDisclaimer'
import BonusStripe from '../../../components/BonusStripe/BonusStripe'
import { Streamer, StreamerBonus } from '../../../models/streamer'
import { configuration } from '../../../configuration'
import axios from 'axios'
import Router from 'next/router'
import lowerCase from 'lodash/lowerCase'
import { useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import FullPageLoader from '../../../components/FullPageLoader'
import Wrapper from '../../../components/Layouts/Wrapper'
import Container from '../../../components/Layouts/Container'

interface Props {
	streamerData: Streamer
	bonusToShow: number[]
}

const Compare: FunctionComponent<Props> = ({ streamerData, bonusToShow }) => {
	const [country, setCountry] = useState<string | undefined>(undefined)
	const [bonuses, setBonuses] = useState<StreamerBonus[] | undefined>(
		undefined
	)

	useEffect(() => {
		geoLocate()
	}, [])

	const geoLocate = async () => {
		const userCountryRequest = await axios.get(configuration.geoApi)
		const countryCode = lowerCase(userCountryRequest.data.country_code2)
		getBonusByName()
		if (countryCode) setCountry(countryCode)
	}

	const getBonusByName = () => {
		const streamerBonuses = streamerData.bonuses
		const placeholder: StreamerBonus[] = []

		console.log(bonusToShow)

		const remappedBonusToShow = [...bonusToShow]

		// betflag == 47 admiral == 33 win 55

		// /b/55-18-1-17-47

		// /b/47-18-1-17-38

		if (remappedBonusToShow.includes(47)) {
			const indexToRemove = remappedBonusToShow.indexOf(47)

			if (!remappedBonusToShow.includes(55)) {
				remappedBonusToShow.splice(indexToRemove, 1, 55)
			} else {
				remappedBonusToShow.splice(indexToRemove, 1, 33)
			}
		}

		remappedBonusToShow.forEach(bonusCode => {
			const b = streamerBonuses.find(b => b.id === bonusCode)
			if (b) placeholder.push(b)
		})

		setBonuses(placeholder)
		console.log(placeholder, 'bonus to show')
	}

	const openWebsite = () => window.open('https://www.spikeslot.com')

	const goToInstagram = () => {
		window.open('https://www.instagram.com/spikeslot')
	}

	const goToTelegram = () => {
		window.open('https://t.me/s/spikeslot')
	}
	const gotToFacebook = () => {
		window.open('https://www.facebook.com/spikeslot')
	}

	const goToTwitter = () => {
		window.open('https://twitter.com/spikeslot')
	}

	const goToYoutube = () => {
		window.open('https://www.youtube.com/c/SPIKEslot2')
	}

	const goToTwitch = () => {
		window.open('https://www.twitch.tv/spikeslot')
	}

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
					Queste sono informazioni atte a riconoscere e comparare siti
					di gioco legale nel tuo paese. Ricordati che al gioco alla
					lunga si perde, perchè i giochi con vincite sono concepiti
					per restituire alla lunga una percentuale inferiore a quella
					giocata, quindi se nella singola partita può capitare di
					vincere, alla lunga è praticamente impossibile. Se decidi di
					procedere, sappi che stai rischiando di perdere i tuoi
					soldi.
				</div>

				<div
					className='social-container'
					style={{
						display: 'flex',
						justifyContent: 'center',
						margin: '.5rem',
						flexWrap: 'wrap',
					}}
				>
					<img
						onClick={() => goToInstagram()}
						style={{ marginRight: '1rem' }}
						height={76}
						src='/icons/instagram.png'
					/>
					<img
						onClick={() => goToTelegram()}
						style={{ marginRight: '1rem' }}
						height={76}
						src='/icons/telegram.png'
					/>
					<img
						onClick={() => gotToFacebook()}
						style={{ marginRight: '1rem' }}
						height={76}
						src='/icons/facebook.png'
					/>
					<img
						onClick={() => goToTwitter()}
						style={{ marginRight: '1rem' }}
						height={76}
						src='/icons/twitter.png'
					/>

					<img
						onClick={() => goToYoutube()}
						style={{ marginRight: '1rem' }}
						height={76}
						src='/icons/youtube.png'
					/>

					<img
						onClick={() => goToTwitch()}
						style={{ marginRight: '1rem' }}
						height={76}
						src='/icons/twitch.png'
					/>
				</div>

				<h1>Migliori casinò legali dove trovare questi giochi:</h1>

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
	const pickedBonus = query.bonuses

	const aquaClient = new AquaClient()

	const bonusToShow = pickedBonus.split('-').map(b => parseInt(b))

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
