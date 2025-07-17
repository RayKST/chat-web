import { useMessages } from "@/http/use-message";
import { MessageItem } from "./message-item";

interface MessageListProps {
    chatId : string
}

export function MessageList (props: MessageListProps) {
    
    const { data } = useMessages(props.chatId);

    return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl text-foreground">
              Mensagens
            </h2>
          </div>
          <div className="flex flex-col space-y-4">
            {data?.map(message => {
              return (
                  <MessageItem 
                  key={message.id}
                  message={message}/>
              )})}
          </div>
        </div>
    )
}