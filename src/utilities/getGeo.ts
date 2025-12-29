import { headers } from 'next/headers'

export async function getVisitorCountry(): Promise<string> {
    const headerList = await headers()

    // 1. Try to get IP
    const forwarded = headerList.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1'

    // 2. Development Override (ip-api doesn't support localhost)
    if (process.env.NODE_ENV === 'development' && (ip === '127.0.0.1' || ip === '::1')) {
        // Change this to 'US' or 'AF' etc., to test your whitelist/blacklist logic
        return 'SI'
    }

    // 3. Fetch from API
    try {
        const res = await fetch(`http://ip-api.com/json/${ip}`, {
            next: { revalidate: 3600 }, // Cache results for 1 hour
        })
        const data = await res.json()
        return data.countryCode || ''
    } catch (err) {
        console.error('Geo-IP lookup failed:', err)
        return ''
    }
}
