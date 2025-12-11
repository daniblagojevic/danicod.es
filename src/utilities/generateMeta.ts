import type { Metadata } from 'next'
import type { Page, Config, Media } from '@/payload-types'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
    const serverUrl = getServerSideURL()
    let url = serverUrl + '/api/media/file/male-technologist.png'
    if (image && typeof image == 'object' && url in image) {
        const ogURL = image.sizes?.small?.url
        url = ogURL ? serverUrl + ogURL : serverUrl + image.url
    }

    return url
}

export const generateMeta = async (args: { doc: Partial<Page> }): Promise<Metadata> => {
    const { doc } = args || {}
    const ogImage = getImageURL(doc?.meta?.image)
    const title = doc?.meta?.title ? doc?.meta?.title + ' | danicod.es' : 'danicod.es'
    const description = doc?.meta?.description ? doc.meta.description : ''

    let url = Array.isArray(doc?.slug) ? '/' + doc.slug.join('/') : doc?.slug ? `${doc.slug}` : '/'
    if (url == 'home') {
        url = ''
    }
    url = getServerSideURL() + '/' + url

    return {
        title,
        description,
        openGraph: mergeOpenGraph({
            title,
            description,
            siteName: title,
            images: ogImage ? [{ url: ogImage }] : undefined,
            //url: Array.isArray(doc.slug) ? doc.slug.join('/') : '/',
            url,
        }),
    }
}
