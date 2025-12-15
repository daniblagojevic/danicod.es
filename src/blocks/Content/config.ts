import { Block } from 'payload'

export const Content: Block = {
    slug: 'content',
    labels: {
        singular: 'Content',
        plural: 'Contents',
    },
    interfaceName: 'ContentBlock',
    fields: [
        {
            label: 'Title',
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            label: 'Text',
            name: 'text',
            type: 'richText',
            required: true,
        },
    ],
}
