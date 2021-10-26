import { CircularProgress } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

interface Props {
    
}

const FullPageLoader = (props: Props) => {
    return (
        <Container>
            <CircularProgress />
        </Container>
    )
}

const Container = styled.div`
    width : 100vw;
    height : 100vh;

    display : flex;
    justify-content : center;
    align-items : center;
`

export default FullPageLoader
