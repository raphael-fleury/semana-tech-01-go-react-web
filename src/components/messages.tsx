import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages, GetRoomMessagesResponse } from "../http/get-room-messages";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function Messages() {
    const queryClient = useQueryClient()
    const { id } = useParams()

    if (!id) {
        throw new Error('Messages component must be used within room page')
    }

    const { data } = useSuspenseQuery({
        queryFn: () => getRoomMessages({roomId: id}),
        queryKey: ['messages', id]
    })

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/subscribe/${id}`)
        ws.onopen = () => console.log('Websocket connected')
        ws.onclose = () => console.log('Websocket connection closed')
        ws.onmessage = (event) => {
            const data: {
                kind: 'message_created' | 'message_answered' | 'message_reaction_increased' | 'message_reaction_decreased',
                value: any
            } = JSON.parse(event.data)

            switch(data.kind) {
                case 'message_created':
                    queryClient.setQueryData<GetRoomMessagesResponse>(['messages', id], (state) => ({
                        messages: [data.value, ...(state?.messages ?? [])]
                    }))
                    break
                case 'message_answered':
                    queryClient.setQueryData<GetRoomMessagesResponse>(['messages', id], (state) => {
                        if (!state) { return undefined }
                        return {
                            messages: state.messages.map(item => {
                                if (item.id === data.value.id) {
                                    return {...item, answered: true}
                                }
                                return item
                            })
                        }
                    })
                    break
                case 'message_reaction_increased':
                case 'message_reaction_decreased':
                    queryClient.setQueryData<GetRoomMessagesResponse>(['messages', id], (state) => {
                        if (!state) { return undefined }
                        return {
                            messages: state.messages.map(item => {
                                if (item.id === data.value.id) {
                                    return {...item, reactionsAmount: data.value.count}
                                }
                                return item
                            })
                        }
                    })
                    break
            }
        }
        return () => {
            ws.close()
        }
    }, [id])

    return (
        <ol className='list-decimal list-outside px-3 space-y-8'>
            {data.messages.map(message => (
                <Message {...message} key={message.id} />
            ))}
        </ol>
    )
}