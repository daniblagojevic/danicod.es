import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type Props = {
    className?: string
} & TestimonialBlockProps

export const TestimonialBlock: React.FC<Props> = ({ text, name }) => {
    return (
        <>
            <div className="bg-spring-wood-50 py-14 md:py-20 relative overflow-hidden">
                <div className="container">
                    <div className="text-lg sm:text-xl md:text-3xl text-center leading-normal">
                        <RichText data={text} />
                    </div>
                    <div className="mt-4 sm:mt-8 text-center font-semibold md:text-xl">
                        <p>{name}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
