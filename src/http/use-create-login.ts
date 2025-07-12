import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateLoginRequest } from './types/create-login-request'
import type { CreateLoginResponse } from './types/create-login-response'

export function useCreateLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateLoginRequest) => {
      const response = await fetch('http://localhost:3333/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: CreateLoginResponse = await response.json()

      return result
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-login'] })
    },
  })
}
