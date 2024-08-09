import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRoomWebSocket } from "../hooks/use-room-web-socket";

export function Messages() {
    const { id } = useParams()

    if (!id) {
        throw new Error('Messages component must be used within room page')
    }

    const { data } = useSuspenseQuery({
        queryFn: () => getRoomMessages({roomId: id}),
        queryKey: ['messages', id]
    })

    useRoomWebSocket({roomId: id})

    const sortedMessages = data.messages.sort((a, b) => b.reactionsAmount - a.reactionsAmount)

    return (
        <ol className='list-decimal list-outside px-3 space-y-8'>
            {sortedMessages.map(message => (
                <Message {...message} key={message.id} />
            ))}
        </ol>
    )
}