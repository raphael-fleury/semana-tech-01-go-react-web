import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
    id: string,
    text: string,
    reactionsAmount: number,
    answered?: boolean
}

export function Message({id, text, reactionsAmount, answered = false}: MessageProps) {
    const roomId = useParams().id
    const [hasReacted, setHasReacted] = useState(false)

    if (!roomId) {
        throw new Error('Message components must be used within room page')
    }

    async function createMessageReactionAction() {
        if (!roomId) { return }

        try {
            await createMessageReaction({roomId, messageId: id})
            setHasReacted(true)
        } catch {
            toast.error('Falha ao reagir, tente novamente')
        }
    }

    async function removeMessageReactionAction() {
        if (!roomId) { return }

        try {
            await removeMessageReaction({roomId, messageId: id})
            setHasReacted(false)
        } catch {
            toast.error('Falha ao remover reação, tente novamente')
        }
    }

    return (
        <li
            data-answered={answered}
            className='ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none'
        >
            {text}
            {hasReacted? (
                <button
                    type="button"
                    onClick={removeMessageReactionAction}
                    className='mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500'
                >
                    <ArrowUp className='size-4'/>
                    Curtir pergunta ({reactionsAmount})
                </button>
            ) : (
                <button
                    type="button"
                    onClick={createMessageReactionAction}
                    className='mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300'
                >
                    <ArrowUp className='size-4'/>
                    Curtir pergunta ({reactionsAmount})
                </button>
            )}
        </li>
    )
}