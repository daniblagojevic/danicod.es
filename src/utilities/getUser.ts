'use server'

import { headers as getHeaders } from 'next/headers'
import type { User } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getUser(): Promise<User | null> {
    const headers = await getHeaders()
    const payload = await getPayload({ config: await configPromise })
    const { user } = await payload.auth({ headers })

    if (user) {
        return user
    }

    return null
}
