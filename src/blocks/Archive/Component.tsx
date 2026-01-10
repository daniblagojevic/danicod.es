import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Header from '@/components/Header'
import { ProjectsArchive } from '@/components/ProjectsArchive'
import { getVisitorCountry } from '@/utilities/getGeo'
import { getUser } from '@/utilities/getUser'

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
    // Get user

    const user = await getUser()

    // Geographic validation

    const { mode, countries } = geoCondition || { mode: 'none' }

    if (mode !== 'none' && user?.id !== process.env.SUPER_ADMIN_ID) {
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
        const payload = await getPayload({ config: configPromise })

        const ids = selectedDocs
            .map((doc) => (typeof doc.value === 'object' ? doc.value.id : doc.value))
            .filter(Boolean)

        const fetchedPosts = await payload.find({
            collection: relationTo as any,
            depth: 1,
            limit,
            where: {
                id: {
                    in: ids,
                },
            },
        })

        posts = fetchedPosts.docs
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
