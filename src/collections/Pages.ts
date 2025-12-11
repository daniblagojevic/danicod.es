import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { Testimonial } from '@/blocks/Testimonial/config'
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'

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
                            blocks: [Testimonial],
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
    ],
}
