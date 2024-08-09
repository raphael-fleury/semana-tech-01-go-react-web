interface CreateMessageReactionRequest {
    roomId: string
    messageId: string
}

const apiUrl = import.meta.env.VITE_APP_API_URL

export async function createMessageReaction({roomId, messageId}: CreateMessageReactionRequest) {
    await fetch(`${apiUrl}/rooms/${roomId}/messages/${messageId}/react`, {
        method: 'PATCH'
    })
}
