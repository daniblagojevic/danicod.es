import React from 'react'
import type { Project } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export type Props = {
    post: Project
    onVideoClick?: () => void
}

export const Card: React.FC<Props> = (props) => {
    const { post, onVideoClick } = props
    return (
        <div className="rounded-lg bg-card text-card-foreground flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">
            {post?.featuredVideo && typeof post.featuredVideo !== 'string' && (
                <video
                    preload="auto"
                    className="cursor-pointer h-40 object-cover object-top w-full"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onClick={onVideoClick}
                >
                    <source
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${post.featuredVideo.url!}`}
                        type="video/mp4"
                    />
                </video>
            )}
            <div className="p-2 grow">
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col">
                            <div className="">
                                <h3 className="font-semibold tracking-tight text-base pb-2">
                                    {post?.title}
                                </h3>
                                <div className="[&_a]:text-black [&_a]:underline [&_a:hover]:text-black text-[#737373] leading-snug text-xs">
                                    <RichText data={post?.content} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {post.tags && post.tags.length > 0 && (
                            <div className="text-pretty font-sans text-sm text-muted-foreground mt-auto flex flex-col pb-2">
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {post.tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="inline-flex items-center rounded-md border font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-1 py-0 text-[10px]"
                                        >
                                            {tag.tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(post.websiteLink || post.sourceLink) && (
                            <div className="flex items-center">
                                <div className="flex flex-row flex-wrap items-start gap-1">
                                    {post.websiteLink && (
                                        <a target="_blank" href={post.websiteLink}>
                                            <div className="items-center rounded-md border font-semibold transition-colors border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 flex gap-2 px-2 py-1 text-[10px]">
                                                <FontAwesomeIcon
                                                    icon={faGlobe}
                                                    className="text-white size-3"
                                                />
                                                Website
                                            </div>
                                        </a>
                                    )}
                                    {post.sourceLink && (
                                        <a target="_blank" href={post.sourceLink}>
                                            <div className="items-center rounded-md border font-semibold transition-colors border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 flex gap-2 px-2 py-1 text-[10px]">
                                                <FontAwesomeIcon
                                                    icon={faGithub}
                                                    className="text-white size-3"
                                                />
                                                Source
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
