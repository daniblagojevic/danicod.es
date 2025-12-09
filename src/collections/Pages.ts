import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
//import { Hero } from '@/blocks/Hero/config'
//import { Gallery } from '@/blocks/Gallery/config'
//import { Testimonial } from '@/blocks/Testimonial/config'
//import { CallToAction } from '@/blocks/CallToAction/config'
//import { Form } from '@/blocks/Form/config'
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
                            name: 'test',
                            type: 'text',
                            required: false,
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
