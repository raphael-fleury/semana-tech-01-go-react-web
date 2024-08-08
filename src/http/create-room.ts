interface CreateRoomRequest {
    theme: string
}

const apiUrl = import.meta.env.VITE_APP_API_URL

export async function createRoom({theme}: CreateRoomRequest) {
    const response = await fetch(`${apiUrl}/rooms`, {
        method: 'POST',
        body: JSON.stringify({theme})
    })

    const data: { id: string } = await response.json()
    return { id: data.id }
}