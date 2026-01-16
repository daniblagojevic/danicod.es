'use client'

import { useState } from 'react'
import type { Form } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'

import { RichText } from '@payloadcms/richtext-lexical/react'

type FormBuilderProps = {
    form: Form
}

type ErrorProps = {
    title: string
    description?: string
} | null

type SuccessProps = {
    title: string
} | null

const colSpans: Record<number, string> = {
    1: 'col-span-10 md:col-span-1',
    2: 'col-span-10 md:col-span-2',
    3: 'col-span-10 md:col-span-3',
    4: 'col-span-10 md:col-span-4',
    5: 'col-span-10 md:col-span-5',
    6: 'col-span-10 md:col-span-6',
    7: 'col-span-10 md:col-span-7',
    8: 'col-span-10 md:col-span-8',
    9: 'col-span-10 md:col-span-9',
    10: 'col-span-10 md:col-span-10',
    11: 'col-span-10 md:col-span-11',
    12: 'col-span-10 md:col-span-12',
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ form }) => {
    const [error, setError] = useState<ErrorProps>(null)
    const [success, setSuccess] = useState<SuccessProps>(null)

    if (!form) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formEl = e.currentTarget
        const formData = new FormData(e.currentTarget)
        const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
            field: name,
            value: value.toString(),
        }))

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

            setSuccess({
                title: 'Message sent successfully.',
            })
            setError(null)

            formEl.reset()
        } catch (error) {
            setSuccess(null)
            setError({
                title: 'Error submitting the form.',
                description:
                    "I'll fix that. In the meantime, you can reach me directly via email: dani@danicod.es",
            })
        }
    }

    return (
        <>
            {form && form.fields && (
                <div>
                    <form onSubmit={handleSubmit} className="">
                        <div className="grid grid-cols-10 gap-x-6 gap-y-4">
                            {form.fields.map((field: any) => (
                                <div key={field.id} className={`${colSpans[field.width]}`}>
                                    <Field>
                                        <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
                                        {field.blockType === 'textarea' ? (
                                            <Textarea
                                                name={field.name}
                                                id={field.id}
                                                required={field.required}
                                                placeholder={field.placeholder}
                                            />
                                        ) : (
                                            <Input
                                                name={field.name}
                                                id={field.id}
                                                type={field.blockType}
                                                required={field.required}
                                                placeholder={field.placeholder}
                                            />
                                        )}
                                    </Field>
                                </div>
                            ))}
                            <div className="col-span-10">
                                <Button type="submit" className="w-full">
                                    {form.submitButtonLabel}
                                </Button>
                            </div>
                        </div>
                    </form>
                    {success && (
                        <div className="mt-6">
                            <Alert variant="success">
                                <FontAwesomeIcon icon={faCheck} />
                                <AlertTitle>{success?.title}</AlertTitle>
                                {form.confirmationMessage && (
                                    <AlertDescription>
                                        <RichText data={form.confirmationMessage} />
                                    </AlertDescription>
                                )}
                            </Alert>
                        </div>
                    )}
                    {error && (
                        <div className="mt-6">
                            <Alert variant="destructive">
                                <FontAwesomeIcon icon={faX} />
                                <AlertTitle>{error?.title}</AlertTitle>
                                <AlertDescription>{error?.description}</AlertDescription>
                            </Alert>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
