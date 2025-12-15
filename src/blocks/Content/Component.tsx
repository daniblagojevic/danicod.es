import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
    className?: string
} & ContentBlockProps

export const ContentBlock: React.FC<Props> = ({ title, text }) => {
    return (
        <>
            <div className="mb-10">
                <h2 className="text-xl font-bold">{title}</h2>
                <div className="[&_a]:text-black [&_a]:underline [&_a:hover]:text-black text-[#737373] leading-snug text-sm">
                    <RichText data={text} />
                </div>
            </div>
        </>
    )
}
