import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod/v4'
import { useValidateLogin } from '@/http/use-validade-login'
import { Button } from './ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const validateLoginSchema = z.object({
  name: z.string().min(3, { message: 'Inclua no mínimo 3 caracteres' }),
  password: z.string().min(4, { message: 'Inclua no mínimo 4 caracteres' }),
})

type LoginFormData = z.infer<typeof validateLoginSchema>

export function LoginForm() {
  const navigate = useNavigate();
  const { mutateAsync: validateLogin } = useValidateLogin();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(validateLoginSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  })

  async function handleLogin({ name, password }: LoginFormData) {
    const response = await validateLogin({ name, password })

    if (!response.userId) {
        alert("Erro ao validar usuário.");
        return loginForm.reset();
    }
    
    navigate("/chats/");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Faça login com o seu usuário!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={loginForm.handleSubmit(handleLogin)}
          >
            <FormField
              control={loginForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome do usuário</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome do usuário..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Senha do usuário</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder='Digite a senha do usuário...'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}