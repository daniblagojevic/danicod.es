import type { TagsBlock as TagsBlockProps } from '@/payload-types'

type Props = {
    className?: string
} & TagsBlockProps

export const TagsBlock: React.FC<Props> = ({ title, items }) => {
    return (
        <>
            <div className="mb-10">
                <h2 className="text-xl font-bold mb-3">{title}</h2>
                {items && (
                    <div className="flex flex-wrap gap-1 items-center">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="inline-flex rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80"
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
