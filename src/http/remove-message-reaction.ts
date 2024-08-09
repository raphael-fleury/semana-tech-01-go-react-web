interface RemoveMessageReactionRequest {
    roomId: string
    messageId: string
}

const apiUrl = import.meta.env.VITE_APP_API_URL

export async function removeMessageReaction({roomId, messageId}: RemoveMessageReactionRequest) {
    await fetch(`${apiUrl}/rooms/${roomId}/messages/${messageId}/react`, {
        method: 'DELETE'
    })
}
