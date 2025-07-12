import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod/v4'
import { useCreateLogin } from '@/http/use-create-login'
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
import { Textarea } from './ui/textarea'

const createLoginSchema = z.object({
  name: z.string().min(3, { message: 'Inclua no mínimo 3 caracteres' }),
  description: z.string(),
})

type CreateLoginFormData = z.infer<typeof createLoginSchema>

export function CreateLoginForm() {
  const navigate = useNavigate();
  const { mutateAsync: createLogin } = useCreateLogin();

  const createLoginForm = useForm<CreateLoginFormData>({
    resolver: zodResolver(createLoginSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function handleCreateLogin({ name, description }: CreateLoginFormData) {
    const response = await createLogin({ name, description })

    if (!response.userId) {
        alert("Erro ao criar usuário.");
        return createLoginForm.reset();
    }
    
    navigate("/chats/");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar login</CardTitle>
        <CardDescription>
          Adicione uma novo login para ter acesso aos chats!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createLoginForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createLoginForm.handleSubmit(handleCreateLogin)}
          >
            <FormField
              control={createLoginForm.control}
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
              control={createLoginForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição do usuário</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button className="w-full" type="submit">
              Criar usuário
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}