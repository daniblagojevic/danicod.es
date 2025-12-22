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
            label: 'Form',
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            required: true,
        },
    ],
}
