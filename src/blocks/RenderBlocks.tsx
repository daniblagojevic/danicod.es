import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'

import { HeroBlock } from '@/blocks/Hero/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ListBlock } from '@/blocks/List/Component'
import { TagsBlock } from '@/blocks/Tags/Component'
import { ArchiveBlock } from '@/blocks/Archive/Component'
import { FormBlock } from '@/blocks/Form/Component'

const blockComponents = {
    hero: HeroBlock,
    content: ContentBlock,
    list: ListBlock,
    tags: TagsBlock,
    archive: ArchiveBlock,
    form: FormBlock,
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
                                <section
                                    key={index}
                                    className="animate-fade-up-blur opacity-0"
                                    style={{
                                        animationDelay: `${index * 250}ms`,
                                    }}
                                >
                                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
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
