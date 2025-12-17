import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type BlockHeader = {
    highlight?: string
    title?: string
    text?: SerializedEditorState
}
type HeaderProps = {
    header?: BlockHeader
}

export default function Header({ header }: HeaderProps) {
    if (!header) return null

    return (
        <>
            <div className="text-center">
                {header.highlight && (
                    <div className="rounded-lg bg-foreground text-background px-3 py-1 text-sm m-auto w-fit mb-4">
                        {header.highlight}
                    </div>
                )}

                {header.title && (
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
                        {header.title}
                    </h2>
                )}

                {header.text && (
                    <div className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        <RichText data={header.text} />
                    </div>
                )}
            </div>
        </>
    )
}
