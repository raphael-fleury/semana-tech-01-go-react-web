import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";

export function Messages() {
    const { id } = useParams()

    if (!id) {
        throw new Error('Messages component must be used within room page')
    }

    const { data } = useSuspenseQuery({
        queryFn: () => getRoomMessages({roomId: id}),
        queryKey: ['messages', id]
    })

    return (
        <ol className='list-decimal list-outside px-3 space-y-8'>
            {data.messages.map(message => (
                <Message {...message} key={message.id} />
            ))}
        </ol>
    )
}