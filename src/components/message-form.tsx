import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCreateMessage } from '@/http/use-create-message'

// Esquema de validação no mesmo arquivo conforme solicitado
const createMessageSchema = z.object({
  content: z
    .string()
    .min(1, 'Mensagem é obrigatória')
    .max(500, 'A mensagem deve ter menos de 500 caracteres'),
  userId: z.string()
})

type CreateMessageFormData = z.infer<typeof createMessageSchema>

interface MessageFormProps {
  chatId: string
}

export function MessageForm({ chatId }: MessageFormProps) {
  const {mutateAsync: createMessage} = useCreateMessage(chatId);

  const form = useForm<CreateMessageFormData>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      content: '',
      userId: '68d39d4e-7a38-44be-851b-cc0fc17d60d5', // mocked user until login control.
    },
    
  })


  async function handleCreateMessage(data: CreateMessageFormData) {
    await createMessage(data);
  }

  const { isSubmitting } = form.formState; 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escreva a sua mensagem</CardTitle>
        <CardDescription>
          Digite sua mensagem abaixo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateMessage)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      disabled={isSubmitting}
                      placeholder="..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit" >Enviar Mensagem</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}