import { Block } from 'payload'
import { headerField } from '@/fields/header'

export const Form: Block = {
    slug: 'form',
    labels: {
        singular: 'Form',
        plural: 'Forms',
    },
    interfaceName: 'FormBlock',
    fields: [
        headerField,
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
