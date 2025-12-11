import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'

//import { HeroBlock } from '@/blocks/Hero/Component'
//import { GalleryBlock } from '@/blocks/Gallery/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'
//import { CallToActionBlock } from '@/blocks/CallToAction/Component'
//import { FormBlock } from '@/blocks/Form/Component'

const blockComponents = {
    //hero: HeroBlock,
    //gallery: GalleryBlock,
    testimonial: TestimonialBlock,
    //cta: CallToActionBlock,
    //form: FormBlock,
}

export const RenderBlocks: React.FC<{
    blocks: Page['layout']
}> = (props) => {
    const { blocks } = props
    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block

                    if (blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType]

                        if (Block) {
                            return (
                                <section key={index}>
                                    <Block {...block} />
                                </section>
                            )
                        }
                    }
                    return null
                })}
            </Fragment>
        )
    }

    return null
}
