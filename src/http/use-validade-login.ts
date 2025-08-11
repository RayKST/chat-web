import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LoginRequest } from './types/login-request'
import type { LoginResponse } from './types/login-response'

export function useValidateLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await fetch('http://localhost:3333/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: LoginResponse = await response.json()

      return result
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-login'] })
    },
  })
}
