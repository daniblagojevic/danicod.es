import type { Block } from 'payload'
import { headerField } from '@/fields/header'

export const Archive: Block = {
    slug: 'archive',
    interfaceName: 'ArchiveBlock',
    labels: {
        plural: 'Archives',
        singular: 'Archive',
    },
    fields: [
        headerField,
        {
            label: 'Populate By',
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                {
                    label: 'Collection',
                    value: 'collection',
                },
                {
                    label: 'Individual Selection',
                    value: 'selection',
                },
            ],
            required: true,
        },
        {
            label: 'Collections To Show',
            name: 'relationTo',
            type: 'select',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'collection',
            },
            defaultValue: 'projects',
            options: [
                {
                    label: 'Projects',
                    value: 'projects',
                },
            ],
            required: true,
        },
        {
            label: 'Limit',
            name: 'limit',
            type: 'number',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'collection',
                step: 1,
            },
            defaultValue: 10,
            required: true,
        },
        {
            label: 'Selection',
            name: 'selectedDocs',
            type: 'relationship',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'selection',
            },
            hasMany: true,
            relationTo: ['projects'],
            required: true,
        },
    ],
}
