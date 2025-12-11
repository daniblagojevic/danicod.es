import { Block } from 'payload'

export const Testimonial: Block = {
    slug: 'testimonial',
    interfaceName: 'TestimonialBlock',
    fields: [
        {
            label: 'Name',
            name: 'name',
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
