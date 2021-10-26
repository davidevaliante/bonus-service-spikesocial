import snakeCase from 'lodash/snakeCase'
import { appTheme } from '../theme/theme';
import { formatDistanceToNow } from 'date-fns';
import itaLocale from 'date-fns/locale/it'

// import he from 'he'

// export const removeHtmlFrom = (str) => {
//     if ((str === null) || (str === '') || (str === undefined))
//         return '';
//     else
//         str = str.toString();
//     return he.decode(str.replace(/<[^>]*>/g, ''));
// }

export const goFullScreen = () => {
    const elem = document.documentElement as HTMLElement & {
        mozRequestFullScreen(): Promise<void>;
        webkitRequestFullscreen(): Promise<void>;
        msRequestFullscreen(): Promise<void>;
    };

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

export const exitFullscreen = () => {

    const elem = document as Document & {
        mozCancelFullScreen(): Promise<void>;
        webkitExitFullscreen(): Promise<void>;
        msExitFullscreen(): Promise<void>;
    };

    if (elem.exitFullscreen && elem.fullscreen) {
        elem.exitFullscreen();
    } else if (elem.mozCancelFullScreen) { /* Firefox */
        elem.mozCancelFullScreen();
    } else if (elem.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitExitFullscreen();
    } else if (elem.msExitFullscreen) { /* IE/Edge */
        elem.msExitFullscreen();
    }
}

export const mapJsonToArray = (obj: any, withId: boolean = false): object[] => {
    let placeholder: object[] = []
    for (const id in obj) {
        const o = obj[id]
        if (withId) {
            o['id'] = id
        }
        placeholder.push(o)
    }
    return placeholder
}

export const IMGS_SIZES = {
    SMALL: 64,
    MEDIUM: 250
}

export const extractTips = (s: string): string[] => {
    const arr = s.split('@')
    arr.splice(0, 1)
    return arr
}

export const getImageLinkFromName = (
    type: 'slot' | 'bonus' | 'bonus_circular' | 'bonusInternal' | 'producer' | 'article',
    name: string,
    size?: 'small' | 'medium' | 'big' | undefined) => {
    const urlStart = 'https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/'
    const slotFolder = 'SlotImages%2F'
    const bonusFolder = 'BonusImages%2F'
    const producerFolder = 'ProducerImages%2F'
    const articleFolder = 'ArticleImages%2F'
    const internalBonusfolder = 'InternalBonusImages%2F'
    const circularBonusImageFolder = 'CircularBonusImages%2F'
    const urlEnd = '?alt=media'

    if (type === 'slot') {
        switch (size) {
            case 'small':
                return `${urlStart}${slotFolder}thumb_${IMGS_SIZES.SMALL}_slot_${snakeCase(name)}${urlEnd}`
            case 'medium':
                return `${urlStart}${slotFolder}thumb_${IMGS_SIZES.MEDIUM}_slot_${snakeCase(name)}${urlEnd}`
            case 'big':
                return `${urlStart}${slotFolder}slot_${snakeCase(name)}${urlEnd}`
            default:
                return `${urlStart}${slotFolder}thumb_${IMGS_SIZES.MEDIUM}_slot_${snakeCase(name)}${urlEnd}`
        }
    }

    if (type === 'bonus') {
        return `${urlStart}${bonusFolder}bonus_${snakeCase(name)}${urlEnd}`
    }

    if (type === 'bonus_circular') {
        return `${urlStart}${circularBonusImageFolder}bonus_circular_${snakeCase(name)}${urlEnd}`
    }

    if (type === 'bonusInternal') {
        return `${urlStart}${internalBonusfolder}bonus_internal_${snakeCase(name)}${urlEnd}`
    }

    if (type === 'producer') {
        switch (size) {
            case 'small':
                return `${urlStart}${producerFolder}thumb_${IMGS_SIZES.SMALL}_producer_${snakeCase(name)}${urlEnd}`
            default:
                return `${urlStart}${producerFolder}producer_${snakeCase(name)}${urlEnd}`
        }
    }

    if (type === 'article') {
        return `${urlStart}${articleFolder}${snakeCase(name)}_article_image${urlEnd}`
    }
}

export const replaceAll = (baseString: string, search: string, replace: string): string => {
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return baseString.toString();
    }

    return escapeRegExp(baseString).replace(new RegExp('[' + search + ']', 'g'), replace);
};

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export const injectCDN = (s: string, size: 'small_' | 'medium_' | 'large_' | 'thumbnail_' | '' = ''): string => {
    const baseUrl = 'https://spike-images.s3.eu-central-1.amazonaws.com/'
    const cloudFrontRoot = `https://dzyz6pzqu8wfo.cloudfront.net/${size}`
    return s.split(baseUrl).join(cloudFrontRoot)
}

export const getColorForType = (type: 'GRATIS' | 'BAR' | 'VLT') => {
    switch (type) {
        case 'GRATIS':
            return appTheme.colors.primary;

        case 'BAR':
            return '#3993ed'

        case 'VLT':
            return '#d11aed'

        default:
            return appTheme.colors.primary;
    }
}

export const formatVideoCardType = (type: 'GRATIS' | 'BAR' | 'VLT'): string => {
    switch (type) {
        case 'GRATIS':
            return 'SLOT ONLINE';
        case 'BAR':
            return 'SLOT BAR';
        case 'VLT':
            return 'SLOT VLT';
        default:
            return 'SLOT ONLINE';
    }
}

export const formatVideoCardDate = (time: number) => {
    return `Aggiunto  ${formatDistanceToNow(new Date(time), {
        addSuffix: true,
        locale: itaLocale,
        includeSeconds: true
    })}`
}