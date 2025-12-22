import type { Field } from 'payload'

const name: Field = {
    name: 'name',
    type: 'text',
    label: 'Name (lowercase, no special characters)',
    required: true,
    admin: {
        width: '50%',
    },
}
const label: Field = {
    name: 'label',
    type: 'text',
    label: 'Label',
    admin: {
        width: '50%',
    },
}
const required: Field = {
    name: 'required',
    type: 'checkbox',
    label: 'Required',
    admin: {
        width: '100%',
    },
}
const placeholder: Field = {
    name: 'placeholder',
    type: 'text',
    label: 'Placeholder',
    admin: {
        width: '50%',
    },
}
const width: Field = {
    name: 'width',
    type: 'select',
    required: true,
    options: [
        { value: '1', label: '10%' },
        { value: '2', label: '20%' },
        { value: '3', label: '30%' },
        { value: '4', label: '40%' },
        { value: '5', label: '50%' },
        { value: '6', label: '60%' },
        { value: '7', label: '70%' },
        { value: '8', label: '80%' },
        { value: '9', label: '90%' },
        { value: '10', label: '100%' },
    ],
    admin: {
        width: '50%',
    },
}

export { name, label, required, width, placeholder }
