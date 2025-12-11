import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
    type: 'website',
    description:
        "Need a developer who handles the front-end and back-end? I'm your Full Stack Dev. Let's make your digital ideas a reality!",
    title: 'danicod.es',
    siteName: 'danicod.es',
    images: [
        {
            url: `${getServerSideURL()}/api/media/file/Different-Types-of-Candle-Molds.jpg`,
        },
    ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
    return { ...defaultOpenGraph, ...og, images: og?.images ? og.images : defaultOpenGraph.images }
}
