import type { CollectionConfig } from 'payload'

import {
    BlocksFeature,
    FixedToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
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
    orderable: true,
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'content',
                            label: false,
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        HeadingFeature({
                                            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
                                        }),
                                        BlocksFeature({ blocks: [] }),
                                        FixedToolbarFeature(),
                                        InlineToolbarFeature(),
                                        HorizontalRuleFeature(),
                                    ]
                                },
                            }),
                            required: true,
                        },
                        {
                            name: 'tags',
                            type: 'array',
                            label: 'Tags',
                            fields: [
                                {
                                    name: 'tag',
                                    type: 'text',
                                    label: 'Tag',
                                    required: true,
                                },
                            ],
                        },
                        {
                            name: 'websiteLink',
                            type: 'text',
                            label: 'Website Link',
                        },

                        {
                            name: 'sourceLink',
                            type: 'text',
                            label: 'Source Link',
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
                        MetaDescriptionField({}),
                        MetaImageField({
                            relationTo: 'media',
                        }),
                        PreviewField({
                            // if the `generateUrl` function is configured
                            hasGenerateFn: true,

                            // field paths to match the target field for data
                            //titlePath: 'meta.title',
                            //descriptionPath: 'meta.description',
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
            label: 'Title',
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
        {
            label: 'Vimeo Video',
            name: 'vimeoVideo',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
