import { Field } from 'payload'
import countries from '@/data/countries.json'

const countryOptions = countries.map((country) => ({
    label: country.name,
    value: country.code,
}))

export const geoConditionField: Field = {
    label: 'Geographic Condition',
    name: 'geoCondition',
    type: 'group',
    admin: {
        hideGutter: false,
    },
    fields: [
        {
            name: 'mode',
            type: 'select',
            defaultValue: 'none',
            options: [
                { label: 'Show to everyone', value: 'none' },
                { label: 'Whitelist (Only show in selected)', value: 'whitelist' },
                { label: 'Blacklist (Hide in selected)', value: 'blacklist' },
            ],
            required: true,
        },
        {
            name: 'countries',
            type: 'select',
            hasMany: true,
            options: countryOptions,
            admin: {
                condition: (_, siblingData) => siblingData?.mode !== 'none',
            },
            required: true,
        },
    ],
}
