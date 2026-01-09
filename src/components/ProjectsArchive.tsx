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
                <DialogContent className="sm:max-w-4xl p-2 sm:p-4">
                    <DialogHeader>
                        <DialogTitle className="py-1">{activePost?.title}</DialogTitle>
                        <DialogDescription asChild>
                            {activePost?.vimeoVideo && (
                                <div>
                                    <iframe
                                        className="w-full h-full border-0 block aspect-18/9"
                                        src={`https://player.vimeo.com/video/${activePost.vimeoVideo}?autoplay=1&badge=0&autopause=0&app_id=58479&loop=1&muted=1`}
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        title={activePost.title}
                                    ></iframe>
                                </div>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
