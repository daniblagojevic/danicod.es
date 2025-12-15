import { Block } from 'payload'

export const List: Block = {
    slug: 'list',
    labels: {
        singular: 'List',
        plural: 'Lists',
    },
    interfaceName: 'ListBlock',
    fields: [
        {
            label: 'Title',
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            label: 'Items',
            name: 'items',
            type: 'array',
            required: true,
            fields: [
                {
                    label: 'Image',
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    label: 'Title',
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    label: 'Text',
                    name: 'text',
                    type: 'text',
                    required: true,
                },
                {
                    label: 'Content',
                    name: 'content',
                    type: 'richText',
                    required: true,
                },
                {
                    label: 'Muted',
                    name: 'muted',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}
