import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { resendAdapter } from '@payloadcms/email-resend'

import { seoPlugin } from '@payloadcms/plugin-seo'

import { formBuilderPlugin, fields } from '@payloadcms/plugin-form-builder'
import { name, label, required, width, placeholder } from '@/plugins/formBuilder/fieldConfig'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Projects } from './collections/Projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Media, Pages, Projects],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    sharp,
    plugins: [
        seoPlugin({
            generateTitle: ({ doc }) => doc.title,
            generateDescription: ({ doc }) => doc.plaintext,
            generateURL: ({ doc }) => `${BASE_URL}/${doc.slug}`,
        }),
        formBuilderPlugin({
            fields: {
                text: {
                    fields: [
                        {
                            type: 'row',
                            fields: [name, label],
                        },
                        {
                            type: 'row',
                            fields: [placeholder, width],
                        },
                        {
                            type: 'row',
                            fields: [required],
                        },
                    ],
                },
                email: {
                    fields: [
                        {
                            type: 'row',
                            fields: [name, label],
                        },
                        {
                            type: 'row',
                            fields: [placeholder, width],
                        },
                        {
                            type: 'row',
                            fields: [required],
                        },
                    ],
                },
                textarea: {
                    fields: [
                        {
                            type: 'row',
                            fields: [name, label],
                        },
                        {
                            type: 'row',
                            fields: [placeholder, width],
                        },
                        {
                            type: 'row',
                            fields: [required],
                        },
                    ],
                },
            },
            formOverrides: {
                admin: {
                    group: 'Forms',
                },
            },
            formSubmissionOverrides: {
                admin: {
                    group: 'Forms',
                },
            },
        }),
    ],
    email: resendAdapter({
        defaultFromAddress: 'dani@danicod.es',
        defaultFromName: 'danicod.es',
        apiKey: process.env.RESEND_API_KEY || '',
    }),
})
