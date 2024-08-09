import "./room.css"
import logo from '../assets/icon.svg'
import { Share2 } from 'lucide-react'
import { useParams } from "react-router-dom"
import { toast } from 'sonner'
import { Messages } from '../components/messages'
import { Suspense } from 'react'
import { CreateMessageForm } from '../components/create-message'

export function Room() {
    const { id } = useParams()

    function handleShareRoom() {
        const url = window.location.href.toString()
        if (navigator.share !== undefined && navigator.canShare()) {
            navigator.share({url})
        } else {
            navigator.clipboard.writeText(url)
            toast.info('A URL da sala foi copiada para sua área de transferência')
        }
    }

    return (
        <div className="room">
            <header>
                <img src={logo} alt="AMA" className='h-5'/>
                <span className='room-id'>
                    Código da sala: <span className='text-zinc-300'>{id}</span>
                </span>
                <button type='submit' onClick={handleShareRoom}>
                    Compartilhar
                    <Share2 className='size-4'/>
                </button>
            </header>

            <div className="h-px w-full bg-zinc-900"/>

            <CreateMessageForm/>

            <Suspense fallback={<p>Carregando...</p>}>
                <Messages/>
            </Suspense>
        </div>
    )
}