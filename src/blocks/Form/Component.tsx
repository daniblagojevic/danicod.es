import type { FormBlock as FormBlockProps } from '@/payload-types'
import Header from '@/components/Header'

type Props = {
    className?: string
} & FormBlockProps

export const FormBlock: React.FC<Props> = ({ header, items }) => {
    return (
        <div className="py-12">
            <Header header={header} />
            <div className="pt-12">fsdfdsfds</div>
        </div>
    )
}
