import logo from '../assets/icon.svg'
import { ArrowRight, Share2 } from 'lucide-react'
import { useParams } from "react-router-dom"
import { toast } from 'sonner'
import { Messages } from '../components/messages'
import { Suspense } from 'react'

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
        <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-2">
            <div className="flex items-center gap-3 px-3">
                <img src={logo} alt="AMA" className='h-5' />
                <span className='text-sm text-zinc-500 truncate'>
                    Código da sala: <span className='text-zinc-300'>{id}</span>
                </span>
                <button
                    type='submit' onClick={handleShareRoom}
                    className='bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-zinc-700'
                >
                    Compartilhar
                    <Share2 className='size-4'/>
                </button>
            </div>

            <div className="h-px w-full bg-zinc-900"/>

            <form
                className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'
            >
                <input
                    className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100'
                    type='text' name='theme' placeholder='Qual a sua pergunta?' autoComplete='off'
                />
                <button 
                    type="submit"
                    className='ml-auto bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-orange-500 '
                >
                    Criar Pergunta
                    <ArrowRight className='size-4'/>
                </button>
            </form>

            <Suspense fallback={<p>Carregando...</p>}>
                <Messages/>
            </Suspense>
        </div>
    )
}