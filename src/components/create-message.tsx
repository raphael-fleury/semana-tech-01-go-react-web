import "./create-message.css"
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";

export function CreateMessageForm() {
    const { id } = useParams()

    if (!id) {
        throw new Error('Messages component must be used within room page')
    }
    
    async function createMessageAction(data: FormData) {
        const message = data.get('message')?.toString()
        if (!message || !id) { return }

        try {
            await createMessage({message, roomId: id})
        } catch {
            toast.error('Falha ao enviar pergunta, tente novamente')
        }
    }

    return (
        <form action={createMessageAction}>
            <input
                type='text'
                name='message'
                placeholder='Qual a sua pergunta?'
                autoComplete='off'
            />
            <button type="submit">
                Criar Pergunta
                <ArrowRight className='size-4'/>
            </button>
        </form>
    )
}