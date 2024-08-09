import "./create-room.css"
import logo from '../assets/icon.svg'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { createRoom } from '../http/create-room'
import { toast } from 'sonner'

export function CreateRoom() {
    const navigate = useNavigate()

    async function handleCreateRoom(data: FormData) {
        const theme = data.get('theme')?.toString()

        if (!theme) {
            return
        }

        try {
            const {id} = await createRoom({theme})
            navigate(`/room/${id}`)
        } catch {
            toast.error("Falha ao criar sala.")
        }
    }

    return (
        <main>
            <div className='content'>
                <img src={logo} alt="AMA" className='h-10'/>
                <p>Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.</p>

                <form action={handleCreateRoom}>
                    <input
                        type='text'
                        name='theme'
                        placeholder='Nome da sala'
                        autoComplete='off'
                    />
                    <button type="submit">
                        Criar Sala
                        <ArrowRight className='size-4'/>
                    </button>
                </form>
            </div>
        </main>
    )
}