import { ArrowLeft, Radio } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { MessageForm } from '@/components/message-form'
import { MessageList } from '@/components/message-list'
import { Button } from '@/components/ui/button'

// import { QuestionForm } from '@/components/question-form'
// import { QuestionList } from '@/components/question-list'

type ChatParams = {
  chatId: string
}

export function Message() {
  const params = useParams<ChatParams>()

  if (!params.chatId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/chats/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>
            <Link to={'/chats/'}>           {/* button to integrate with AI */}
              <Button className="flex items-center gap-2" variant="secondary">
                <Radio className="size-4" />
                Gravar Áudio
              </Button>
            </Link>
          </div>
          <h1 className="mb-2 font-bold text-3xl text-foreground">
            Live Chat
          </h1>
          <p className="text-muted-foreground">
            Converse com outros usuários da sala
          </p>
        </div>

        <div className="mb-8">
          <MessageForm chatId={params.chatId} />
        </div>
        <MessageList chatId={params.chatId} />
      </div>
    </div>
  )
}