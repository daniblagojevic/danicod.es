import type { Project } from '@/payload-types'

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
                    <ul className="grid grid-cols-2 gap-4">
                        {posts.map((post, index) => (
                            <li key={post.id} className="col-span-1">
                                <Card post={post} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}
