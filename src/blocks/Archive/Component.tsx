import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Header from '@/components/Header'
import { ProjectsArchive } from '@/components/ProjectsArchive'
import { getVisitorCountry } from '@/utilities/getGeo'

// Import all types that could be returned
import type { Project, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

// Create a Union type of all possible documents
type CollectionTypes = Project | any

type Props = {
    className?: string
} & ArchiveBlockProps

export const ArchiveBlock: React.FC<Props> = async ({
    header,
    populateBy,
    relationTo,
    limit: limitFromProps,
    selectedDocs,
    geoCondition,
}) => {
    // Geographic validation

    const { mode, countries } = geoCondition || { mode: 'none' }

    if (mode !== 'none') {
        const visitorCountry = await getVisitorCountry()

        if (mode === 'blacklist' && countries?.includes(visitorCountry as any)) {
            return null // User is in a forbidden country
        }

        if (mode === 'whitelist' && !countries?.includes(visitorCountry as any)) {
            return null // User is NOT in an allowed country
        }
    }

    // Fetch posts

    const limit = limitFromProps || 3

    let posts: CollectionTypes[] = []

    if (populateBy === 'collection' && relationTo) {
        const payload = await getPayload({ config: configPromise })

        const fetchedPosts = await payload.find({
            collection: relationTo as any,
            depth: 1,
            limit,
        })

        posts = fetchedPosts.docs
    } else if (populateBy === 'selection' && selectedDocs?.length) {
        posts = selectedDocs
            .map((post) => {
                if (typeof post.value === 'object') return post.value
                return null
            })
            .filter(Boolean) as CollectionTypes[]
    }

    return (
        <div className="py-12">
            <Header header={header} />
            <div className="pt-12">
                {relationTo === 'projects' && <ProjectsArchive posts={posts} />}
            </div>
        </div>
    )
}
