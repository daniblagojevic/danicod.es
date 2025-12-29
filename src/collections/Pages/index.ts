import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { Hero } from '@/blocks/Hero/config'
import { Content } from '@/blocks/Content/config'
import { List } from '@/blocks/List/config'
import { Tags } from '@/blocks/Tags/config'
import { Archive } from '@/blocks/Archive/config'
import { Form } from '@/blocks/Form/config'

import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { revalidateDelete, revalidateChange } from './hooks/revalidatePage'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    defaultPopulate: {
        title: true,
        slug: true,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            required: false,
                            blocks: [Hero, Content, List, Tags, Archive, Form],
                        },
                    ],
                },
                {
                    label: 'SEO',
                    name: 'meta',
                    fields: [
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaDescriptionField({
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            relationTo: 'media',
                        }),
                        PreviewField({
                            hasGenerateFn: true,
                        }),
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        }),
                    ],
                },
            ],
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        slugField(),
        {
            label: 'Featured Image',
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            admin: {
                position: 'sidebar',
            },
        },
    ],
    hooks: {
        afterChange: [revalidateChange],
        afterDelete: [revalidateDelete],
    },
}
