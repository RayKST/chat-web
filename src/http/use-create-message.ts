import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateMessageRequest } from './types/create-message-request'
import type { CreateMessageResponse } from './types/create-message-response'

export function useCreateMessage(chatId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateMessageRequest) => {
      const response = await fetch(`http://localhost:3333/chat/${chatId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result: CreateMessageResponse = await response.json();
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-messages', chatId] });
    },
  })
}
