import "./message.css"
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
        <li data-answered={answered}>
            {text}
            {hasReacted? (
                <button
                    type="button"
                    onClick={removeMessageReactionAction}
                    className='remove-reaction'
                >
                    <ArrowUp className='size-4'/>
                    Curtir pergunta ({reactionsAmount})
                </button>
            ) : (
                <button
                    type="button"
                    onClick={createMessageReactionAction}
                    className='add-reaction'
                >
                    <ArrowUp className='size-4'/>
                    Curtir pergunta ({reactionsAmount})
                </button>
            )}
        </li>
    )
}