'use client'
import React from 'react'

type FormBuilderProps = {
    formId?: number
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ formId }) => {
    return <div>Form Builder for form ID: {formId}</div>
}
