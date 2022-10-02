import React, { useContext } from 'react'
import styled from 'styled-components'
import { FunctionComponent } from 'react'
import { Bonus } from './../../graphql/schema'
import LazyBonusImage from '../Lazy/LazyBonusImage'
import { injectCDN } from './../../utils/Utils'
import snakeCase from 'lodash'
import LazyImage from '../Lazy/LazyImage'
import Link from 'next/link'
import { countryContext } from './../../context/CountryContext'
import { StreamerBonus } from '../../models/streamer'
import { configuration } from '../../configuration'
import { desktop } from '../Responsive/Breakpoints'
import Router from 'next/router'

interface Props {
	bonus: StreamerBonus
	eng?: boolean
	countryCode: string
	fromInstagram?: boolean
}

const BonusStripe: FunctionComponent<Props> = ({
	bonus,
	eng = false,
	countryCode,
	fromInstagram,
}) => {
	const { currentCountry } = useContext(countryContext)

	const visit = () => {
		// const linkToOpen = extractLink()
		// if(linkToOpen.includes('leovegas')) Router.push('/visita/leovegas')
		// if(linkToOpen.includes('starvegas')) Router.push('/visita/starvegas')
		// if(linkToOpen.includes('lottomatica')) Router.push('/visita/lottomatica')
		// if(linkToOpen.includes('admiral')) Router.push('/visita/admiralyes')
		// window.open(extractLink())

		if (fromInstagram)
			Router.push(
				`/visita/${bonus.compareCode}/${countryCode}?instagram=true`
			)
		else Router.push(`/visita/${bonus.compareCode}/${countryCode}`)
	}

	const extractNoDepositText = () => {
		const texts = bonus.noDepositDescription
		const matchingText = texts.find(it => it.label === countryCode)
		if (matchingText) return matchingText.description
		else {
			const toReturn = texts.find(it => it.label === 'row')
			if (toReturn) return toReturn.description
			else return ''
		}
	}

	const extractWithDepositText = () => {
		const texts = bonus.withDepositDescription
		const matchingText = texts.find(it => it.label === countryCode)
		if (matchingText) return matchingText.description
		else {
			const toReturn = texts.find(it => it.label === 'row')
			if (toReturn) return toReturn.description
			else return ''
		}
	}

	const extractLink = () => {
		const links = bonus.links
		const matchingLink = links.find(
			it =>
				it.label ===
				`${bonus.compareCode} ${configuration.streamerName} ${countryCode}`
		)
		if (matchingLink) return matchingLink.link
		else {
			const toReturn = links.find(
				it =>
					it.label ===
					`${bonus.compareCode} ${configuration.streamerName} row`
			)
			if (toReturn) return toReturn.link
			else return ''
		}
	}

	const visitGuide = () => {
		switch (bonus.name) {
			case 'StarCasino':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-starcasino/it'
				)
				break

			case 'Unibet Casino':
				window.open(
					'https://www.spikeslotgratis.com/guida/guida-bonus-unibet-casino/it'
				)
				break

			case 'Eurobet Casino':
				window.open(
					'https://www.spikeslotgratis.com/guida/guida-bonus-benvenuto-eurobet/it'
				)
				break

			case 'Betway':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-casino-betway/it'
				)
				break

			case 'Casino.com Casino':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-casino-com/it'
				)
				break

			case 'LeoVegas Casino':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-casino-leovegas/it'
				)
				break

			case '888 Casino':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-888-casino/it'
				)
				break

			case 'Lottomatica':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-lottomatica-casino/it'
				)
				break

			case 'GoldBet':
				window.open(
					'https://www.spikeslotgratis.com/guida/guida-bonus-goldbet/it'
				)
				break

			case 'NetBet':
				window.open(
					'https://www.spikeslotgratis.com/guida/netbet-casino-bonus-benvenuto/it'
				)
				break

			case 'Starvegas Casino':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-casino-starvegas/it'
				)
				break

			case 'Gioco Digitale Casino':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-casino-gioco-digitale/it'
				)
				break

			case 'BetFlag':
				window.open(
					'https://www.spikeslotgratis.com/guida/casino-betflag-bonus-benvenuto/it'
				)
				break

			case 'Bwin':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-casino-bwin/it'
				)
				break

			case 'PokerStars Casino':
				window.open(
					'https://www.spikeslotgratis.com/guida/guida-al-bonus-di-benvenuto-pokerstars/it'
				)
				break

			case 'Snai Casino':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-casino-snai/it'
				)
				break

			case 'AdmiralYES':
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-casino-slotyes/it'
				)
				break

			case 'WinCasino':
				window.open(
					'https://spikeslotgratis.com/guida/recensione-wincasino-bonus/it'
				)
				break

			case 'William Hill':
				window.open(
					'https://spikeslotgratis.com/guida/recensione-william-hill-bonus/it'
				)

			default:
				window.open(
					'https://www.spikeslotgratis.com/guida/bonus-benvenuto-starcasino/it'
				)
		}
	}

	return (
		<Container>
			<Row onClick={() => visit()}>
				<LazyBonusImage
					width={50}
					height={50}
					borderColor={bonus.borderColor}
					src={`${configuration.api}${bonus.circularImage.url}`}
				/>
				<div className='name-container'>
					<h2>{bonus.name}</h2>
					<StarContainer>
						{[...Array(bonus.rating).keys()].map((s, i) => (
							<img
								key={`${snakeCase(bonus.name)}_${i}_start_full`}
								alt='full_star_icon'
								className='star'
								src='/icons/star_full.svg'
							/>
						))}
						{[...Array(5 - bonus.rating).keys()].map((s, i) => (
							<img
								key={`${snakeCase(
									bonus.name
								)}_${i}_start_empty`}
								alt='empty_star_icon'
								className='star'
								src='/icons/star_empty.svg'
							/>
						))}
					</StarContainer>
				</div>
				{/* <LazyImage width={30} height={30} src='/icons/italy_flag.svg' /> */}
			</Row>

			<RowDeposit onClick={() => visit()}>
				<div className='deposit-container'>
					<h3>{'Senza Deposito'}</h3>
					<p>{extractNoDepositText()}</p>
				</div>

				<div className='deposit-container'>
					<h3>{'Con Deposito'}</h3>
					<p>{extractWithDepositText()}</p>
				</div>
			</RowDeposit>

			<Row style={{ marginTop: '.5rem', justifyContent: 'space-around' }}>
				{/* {bonus.bonus_guide && !eng && <GuideButton onClick={() => window.open(`https://www.spikeslot.com/guida/${bonus.bonus_guide!.slug}/${countryCode ? countryCode : currentCountry}`)}>
                    {!eng ? 'READ THE GUIDE' : 'READ THE GUIDE'}
                </GuideButton>} */}

				<WebSiteButton onClick={() => visit()}>
					{'Visita il sito'}
				</WebSiteButton>

				<GuideButton onClick={() => visitGuide()}>
					{'Leggi la Guida'}
				</GuideButton>
			</Row>
		</Container>
	)
}

const GuideButton = styled.div`
	cursor: pointer;
	border: 2px solid ${props => props.theme.colors.primary};
	padding: 0.5rem 1rem;
	width: 35%;
	text-align: center;
	font-weight: bold;
	color: ${props => props.theme.colors.primary};
	border-radius: 4px;
	width: 120px;
	height: 52px;
	box-sizing: border-box;
`

const WebSiteButton = styled.div`
	cursor: pointer;
	background: ${props => props.theme.colors.secondary};
	border: 2px solid ${props => props.theme.colors.secondary};
	padding: 0.5rem 1rem;
	width: 35%;
	text-align: center;
	color: white;
	font-weight: bold;
	border-radius: 4px;
	height: 52px;
	width: 120px;
	box-sizing: border-box;
`

const StarContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;

	.star {
		width: 16px;
		height: 16px;
	}
`

const Row = styled.div`
	display: flex;
	justify-content: center;
	margin: 0rem 1rem;
	align-items: center;
	flex-grow: 1;
	margin-bottom: 1rem;
	width: 280px;

	${desktop} {
		margin-bottom: 0rem;
	}

	h2 {
		text-align: start;
	}

	.name-container {
		flex-grow: 1;
		margin-left: 2rem;

		h2 {
			color: ${props => props.theme.colors.secondary};
		}
	}
`

const RowDeposit = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	padding: 0.5rem;
	margin-top: 0.4rem;

	margin-bottom: 1rem;

	${desktop} {
		margin-bottom: 0rem;
	}

	.deposit-container {
		width: 45%;
	}

	h3 {
		color: grey;
		font-weight: bold;
		font-size: 0.8rem;
		margin-bottom: 0.2rem;
	}

	p {
		color: black;
		font-weight: bold;
		line-height: 1.2rem;
	}
`

const Container = styled.div`
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	border: 1px solid ${props => props.theme.colors.primary};
	padding: 1rem;
	margin: 1rem;
	background: #ffffff;
	border-radius: 8px;
	box-shadow: 3px 3px 5px 0px rgba(50, 50, 50, 0.75);
	a {
		all: unset;
		color: ${props => props.theme.colors.primary};
	}

	h2 {
		font-weight: bold;
		font-size: 1.3rem;
		margin-bottom: 0.4rem;
	}
`

export default BonusStripe
