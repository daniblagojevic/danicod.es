import React from 'react'

import type { Project } from '@/payload-types'

export type Props = {
    post?: Project
}

export const Card: React.FC<Props> = (props) => {
    const { post } = props
    return (
        <div className="p-4">
            <h3>{post?.slug}</h3>
            <div>{post?.title}</div>
        </div>
    )
}
