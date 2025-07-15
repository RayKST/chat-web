import { useQuery } from '@tanstack/react-query';
import type { GetMessagesResponse } from './types/get-messages-response';


export function useMessages(chatId: string) {
  return useQuery({
    queryKey: ['get-messages', chatId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/chat/${chatId}/message`);
      const result: GetMessagesResponse = await response.json();

      return result;
    },
  })
}