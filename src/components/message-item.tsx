import { MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { dayjs } from '@/lib/dayjs'

interface Message {
  id: string
  content: string
  userName: string
  createdAt: string
}

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {

  return (
    <Card>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Usuário: {message.userName}</p>
              <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>

          
          <span className="whitespace-nowrap text-muted-foreground text-xs">
            {dayjs(message.createdAt).toNow()}
          </span>
          
        </div>
      </CardContent>
    </Card> 
  )
}