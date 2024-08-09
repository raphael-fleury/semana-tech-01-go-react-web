interface CreateMessageRequest {
    roomId: string
    message: string
}

const apiUrl = import.meta.env.VITE_APP_API_URL

export async function createMessage({roomId, message}: CreateMessageRequest) {
    const response = await fetch(`${apiUrl}/rooms/${roomId}/messages`, {
        method: 'POST',
        body: JSON.stringify({message})
    })

    const data: { id: string } = await response.json()
    return { id: data.id }
}
