import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import LazyImage from '../Lazy/LazyImage'

interface Props {
    isFromItaly: boolean
}

const palette = {
    darkBg: '#2e2e2e',
    extraDarkBg: '#1c1c1c',
    red: '#f95565'
}

const GeoVideoDiscalimer: FunctionComponent<Props> = ({
    isFromItaly
}) => {


    return (
        <Container>
            This website serves as a comparison between multiple bonuses for a given country and it's aimed to be as honest and transparent as possible. In this list you'll find only certified online casinos for your country but there might be some error due to the use of an external geolocalization tool.
            Underage gambling is stricly forbidden and it might cause addiction. Play responsibly and do not chase your losses.
            {isFromItaly && <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>This offers are intended for Italians living in foreign countries</p>}
            <div className='alert-container'>
                <LazyImage
                    width={46}
                    height={46}
                    alt='alert icon'
                    src='/icons/alert.svg' />
            </div>


            {/* <div style={{ display: 'flex', background: 'white', padding: '1rem', justifyContent: 'space-around', alignItems: 'center' }}>
                <LazyImage
                    width={80}
                    height={70}
                    alt='alert icon'
                    src='/icons/aams_logo.png' />

                <LazyImage
                    width={70}
                    height={40}
                    alt='alert icon'
                    src='/icons/playsafe_left_it.png' />
            </div> */}

        </Container>
    )
}

const Container = styled.div`
    color : black;
    background : white;
    padding : 1rem 2rem;
    position : relative;
    max-width : 400px;      
    border-radius : 8px;
    margin : 3rem auto;
    border : 3px solid ${palette.darkBg};

    .alert-container{
        position : absolute;
        top : -30px;
        left : -20px;        
    }
`

export default GeoVideoDiscalimer
