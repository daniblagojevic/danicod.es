'use client'

import type { Project } from '@/payload-types'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Card } from '@/components/ProjectsCard'

export type Props = {
    posts: Project[]
}

export const ProjectsArchive: React.FC<Props> = (props) => {
    const { posts } = props

    const [open, setOpen] = useState(false)
    const [activePost, setActivePost] = useState<Project | null>(null)

    const handleVideoClick = (post: Project) => {
        setActivePost(post)
        setOpen(true)
    }

    return (
        <>
            <div>
                {posts && (
                    <ul className="grid grid-cols-2 gap-3">
                        {posts.map((post, index) => (
                            <li key={post.id} className="col-span-2 sm:col-span-1">
                                <Card post={post} onVideoClick={() => handleVideoClick(post)} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Dialog open={open} onOpenChange={(open) => !open && setOpen(false)}>
                <DialogContent className="sm:max-w-4xl p-4">
                    <DialogHeader>
                        <DialogTitle>{activePost?.title}</DialogTitle>
                        <DialogDescription>
                            {activePost?.featuredVideo &&
                            typeof activePost.featuredVideo !== 'string' ? (
                                <video preload="auto" className="sm:min-h-[450px] w-full" controls>
                                    <source
                                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${activePost.featuredVideo.url!}`}
                                        type="video/mp4"
                                    />
                                </video>
                            ) : (
                                <div>fsdfdsf</div>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
