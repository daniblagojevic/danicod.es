import { Block } from 'payload'

export const Tags: Block = {
    slug: 'tags',
    labels: {
        singular: 'Tags',
        plural: 'Tags',
    },
    interfaceName: 'TagsBlock',
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
                    label: 'Title',
                    name: 'title',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}
