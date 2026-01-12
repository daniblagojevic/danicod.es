import type { ListBlock as ListBlockProps } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

type Props = {
    className?: string
} & ListBlockProps

export const ListBlock: React.FC<Props> = ({ title, items }) => {
    return (
        <>
            <div className="mb-10">
                <h2 className="text-xl font-bold mb-3">{title}</h2>
                {items && (
                    <Accordion type="single" collapsible className="w-full">
                        {items.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger className="hover:cursor-pointer group">
                                    <div className="flex gap-3 w-full">
                                        <div className="shrink-0 w-auto">
                                            {typeof item.image === 'object' && (
                                                <div className="border size-12 overflow-hidden rounded-full">
                                                    <Image
                                                        src={item?.image?.url || ''}
                                                        alt={item?.image?.alt || ''}
                                                        width={75}
                                                        height={75}
                                                        className="w-fll h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="grow mt-1">
                                            <div>
                                                <div>
                                                    <div className="flex gap-3 justify-between">
                                                        <div>
                                                            <div className="flex gap-2 items-center">
                                                                <div>
                                                                    <h3 className="font-semibold text-xs sm:text-sm">
                                                                        {item.title}
                                                                    </h3>
                                                                </div>
                                                                <div>
                                                                    <FontAwesomeIcon
                                                                        icon={faChevronRight}
                                                                        className="
                                                                    h-2 md:h-3 
                                                                    text-[#737373]
                                                                    
                                                                    md:opacity-0
                                                                    md:-translate-x-2

                                                                    transition-all
                                                                    duration-200
                                                                    ease-out

                                                                    group-hover:opacity-100
                                                                    group-hover:translate-x-0

                                                                    group-data-[state=open]:rotate-90"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="shrink-0 ms-auto text-[#737373] ">
                                                                <p className="text-xs sm:text-sm ">
                                                                    {item.muted}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="text-xs font-normal mt-1">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <AccordionContent className="mt-2">
                                                    <div className="[&_a]:text-black [&_a]:underline [&_a:hover]:text-black text-xs sm:text-sm">
                                                        <RichText data={item.content} />
                                                    </div>
                                                </AccordionContent>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </>
    )
}
