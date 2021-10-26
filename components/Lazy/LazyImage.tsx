import React, { CSSProperties, FunctionComponent, useState, useEffect, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { placeholderImage } from '../../constants/constants'

interface Props {
    onClick?: () => void
    onVisibilityChanged?: (visible: boolean) => void
    fromTop?: number
    fromBottom?: number
    fromRight?: number
    fromLeft?: number
    once?: boolean
    style?: CSSProperties
    className?: string
    show?: boolean
    src?: string
    alt?: string
    width: string | number
    height: string | number
    withPlaceholder?: boolean
}
const LazyImage: FunctionComponent<Props> = ({
    fromTop = '0',
    fromRight = '0',
    fromBottom = '0',
    fromLeft = '0',
    once = true,
    onVisibilityChanged,
    onClick,
    style,
    className,
    src,
    width,
    height,
    withPlaceholder = false,
    alt
}) => {

    const [imageSrc, setImageSrc] = useState(src)
    const [_inView, setInView] = useState(false)
    const [fadeIn, setFadeIn] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const _rootMargin = `${fromTop}px ${fromRight}px ${fromBottom}px ${fromLeft}px`

    const [ref, inView, entry] = useInView({
        rootMargin: _rootMargin,
        threshold: 0,
        triggerOnce: once,
    })
    useEffect(() => {
        onVisibilityChanged && onVisibilityChanged(inView)
        setInView(inView)
    }, [inView])

    return (
        <LazyLoadWrapper
            ref={ref}
            onClick={() => onClick && onClick()}
            show={_inView}
            width={width}
            style={style}
            height={height}>
            {!_inView && withPlaceholder && <div style={style} className='grey-div'></div>}


            <img
                style={style}
                className={`image ${_inView ? 'fade-in' : ''} ${className ? className : ''}`}
                onLoad={() => setImageLoaded(true)}
                src={_inView ? imageSrc : ''}
                alt={alt && alt} />

        </LazyLoadWrapper>
    )
}


const LazyLoadWrapper = styled.div`
    position : relative;
    box-sizing: border-box;
    width : ${(props: Props) => {
        if (typeof props.width === 'string') return props.width
        if (typeof props.width === 'number') return `${props.width}px`
    }};
    height : ${(props: Props) => {
        if (typeof props.height === 'string') return props.height
        if (typeof props.height === 'number') return `${props.height}px`
    }};

    .image{
        width : ${(props: Props) => {
        if (typeof props.width === 'string') return props.width
        if (typeof props.width === 'number') return `${props.width}px`
    }};
            height : ${(props: Props) => {
        if (typeof props.height === 'string') return props.height
        if (typeof props.height === 'number') return `${props.height}px`
    }};
        opacity:0;
        object-fit : cover;
        transition : all .3s ease-in;
    }

    .fade-in{
        opacity : 1;
        transition : all .3s ease-in;
    }

    .grey-div{
        position : absolute;
        top:0;
        left:0;
        width : ${(props: Props) => {
        if (typeof props.width === 'string') return props.width
        if (typeof props.width === 'number') return `${props.width}px`
    }};
    
    height : ${(props: Props) => {
        if (typeof props.height === 'string') return props.height
        if (typeof props.height === 'number') return `${props.height}px`
    }};
        background : lightgrey;
        border-radius : 4px;
    }
`
export default LazyImage