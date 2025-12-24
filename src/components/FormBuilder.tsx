'use client'

import { useEffect, useState } from 'react'

import type { Form } from '@/payload-types'

type FormBuilderProps = {
    form: Form
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ form }) => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    if (!form) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formEl = e.currentTarget
        const formData = new FormData(e.currentTarget)
        const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
            field: name,
            value: value.toString(),
        }))

        console.log({ dataToSend })

        // send form data to payload

        try {
            const response = await fetch('/api/form-submissions', {
                method: 'POST',
                body: JSON.stringify({
                    form: form.id,
                    submissionData: dataToSend,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('Request failed')
            }

            setSuccess(true)
            setError(null)

            formEl.reset()
        } catch (error) {
            setSuccess(false)
            setError('Error submitting form')
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="">
                    sdfsdfsdfsdfd
                </form>
            </div>
        </>
    )
}
