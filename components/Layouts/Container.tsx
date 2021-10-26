import styled from 'styled-components'
import { tablet } from '../Responsive/Breakpoints'

const Container = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    background : #f8f8f8;
    box-shadow:         3px 3px 5px 0px rgba(50, 50, 50, 0.75);

    .top-bar{
        display : flex;
        flex-direction : column;
        justify-content : center;
        max-height : 100px;
        background: ${(props) => props.theme.colors.primary};
        box-shadow:         3px 3px 5px 0px rgba(50, 50, 50, 0.75);
    }

    .logo{
        height : 120px;
        margin : .5rem auto;
    }

    h1{
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

export default Container