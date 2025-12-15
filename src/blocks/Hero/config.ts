import { Block } from 'payload'

export const Hero: Block = {
    slug: 'hero',
    labels: {
        singular: 'Hero',
        plural: 'Heros',
    },
    interfaceName: 'HeroBlock',
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
        {
            label: 'Image',
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
}
