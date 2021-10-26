import React from 'react'
import FullPageLoader from './../components/FullPageLoader';
import { useEffect } from 'react';
import { useRouter } from 'next/router'

interface Props {
    
}

const yggdrasil = (props: Props) => {

    const router = useRouter()

    useEffect(() => {   
        window.location.replace('https://www.spikeslot.com/slot/yggdrasil/it')
    }, [])

    return <FullPageLoader />
}

export default yggdrasil
