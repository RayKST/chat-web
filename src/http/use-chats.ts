import { useQuery } from '@tanstack/react-query';
import type { GetChatsResponse } from './types/get-chats-response';

export function useChats() {
  return useQuery({
    queryKey: ['get-chats'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/chat');
      const result: GetChatsResponse = await response.json();

      return result;
    },
  })
}