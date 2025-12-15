import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type Props = {
    className?: string
} & HeroBlockProps

export const HeroBlock: React.FC<Props> = ({ title, text, image }) => {
    return (
        <>
            <div className="mb-10">
                <div className="gap-4 flex justify-between">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                            {title}
                        </h1>
                        <div className="md:text-xl">
                            <RichText data={text} />
                        </div>
                    </div>
                    <div>
                        <div className="relative overflow-hidden rounded-full size-28">
                            {typeof image === 'object' && (
                                <Image
                                    src={image.url ?? ''}
                                    alt={image.alt ?? ''}
                                    width={300}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
