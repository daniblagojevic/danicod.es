//import { headers as getHeaders } from 'next/headers.js'
import React, { cache } from 'react'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import configPromise from '@payload-config'
//import config from '@/payload.config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import Page404 from '@/components/404'
import type { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
        collection: 'pages',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    const params = pages.docs
        ?.filter((doc) => {
            return doc.slug !== 'home'
        })
        .map(({ slug }) => {
            return { slug }
        })

    return params
}

type Args = {
    params: Promise<{
        slug?: string
    }>
}

export default async function Page({ params: paramsPromise }: Args) {
    const { slug = 'home' } = await paramsPromise
    // Decode to support slugs with special characters
    const decodedSlug = decodeURIComponent(slug)
    const page = await queryPageBySlug({
        slug: decodedSlug,
    })

    if (!page) {
        return <Page404 />
    }

    const { layout } = page

    return (
        <article className="">
            <RenderBlocks blocks={layout} />
        </article>
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { slug = 'home' } = await paramsPromise
    // Decode to support slugs with special characters
    const decodedSlug = decodeURIComponent(slug)
    const page = await queryPageBySlug({
        slug: decodedSlug,
    })

    return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'pages',
        //draft,
        limit: 1,
        pagination: false,
        //overrideAccess: draft,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})
