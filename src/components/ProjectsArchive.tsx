import type { Project } from '@/payload-types'

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
    return (
        <>
            <div>
                {posts && (
                    <ul className="grid grid-cols-2 gap-3">
                        {posts.map((post, index) => (
                            <li key={post.id} className="col-span-2 sm:col-span-1">
                                <Card post={post} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
