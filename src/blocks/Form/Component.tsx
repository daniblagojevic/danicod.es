import type { FormBlock as FormBlockProps } from '@/payload-types'
import Header from '@/components/Header'
import { FormBuilder } from '@/components/FormBuilder'

type Props = {
    className?: string
} & FormBlockProps

export const FormBlock: React.FC<Props> = ({ header, form }) => {
    return (
        <>
            {typeof form == 'object' && (
                <div className="py-12">
                    <Header header={header} />
                    <div className="pt-12">
                        <FormBuilder form={form} />
                    </div>
                </div>
            )}
        </>
    )
}
