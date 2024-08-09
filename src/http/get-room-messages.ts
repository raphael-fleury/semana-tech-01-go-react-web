interface GetRoomMessagesRequest {
    roomId: string
}

export interface GetRoomMessagesResponse {
    messages: {
        id: string,
        text: string,
        reactionsAmount: number,
        answered: boolean
    }[]
}

const apiUrl = import.meta.env.VITE_APP_API_URL

export async function getRoomMessages({roomId}: GetRoomMessagesRequest) {
    const response = await fetch(`${apiUrl}/rooms/${roomId}/messages`)

    const data: Array<{
        id: string,
        room_id: string,
        message: string,
        reaction_count: number,
        answered: boolean
    }> = await response.json()

    return {
        messages: data.map(item => ({
            id: item.id,
            text: item.message,
            reactionsAmount: item.reaction_count,
            answered: item.answered
        }))
    } as GetRoomMessagesResponse
}