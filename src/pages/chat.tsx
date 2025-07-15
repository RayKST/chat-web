import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useChats } from '@/http/use-chats'
import { dayjs } from '@/lib/dayjs'

export function Chats() {
  const { data, isLoading } = useChats();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chats recentes</CardTitle>
        <CardDescription>
          Acesso rápido para os chats criados recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando salas...</p>
        )}

        {data?.map((chats) => {
          return (
            <Link
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
              key={chats.id}
              to={`/chats/${chats.id}/message`}
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-medium">{chats.name}</h3>

                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant="secondary">
                    {dayjs(chats.createdAt).toNow()}
                  </Badge>
                </div>
              </div>

              <span className="flex items-center gap-1 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}