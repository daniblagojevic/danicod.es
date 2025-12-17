import type { Field } from 'payload'

export const headerField: Field = {
    label: 'Header',
    name: 'header',
    type: 'group',
    fields: [
        {
            label: 'Highlight',
            name: 'highlight',
            type: 'text',
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
            type: 'richText',
            required: true,
        },
    ],
}
