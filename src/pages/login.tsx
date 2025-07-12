import { CreateLoginForm } from "@/components/create-login-form"

export function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <div className="mx-auto max-w-4xl">
            <div className="grid items-start gap-8">
                <CreateLoginForm/>
            </div>
        </div>
    </div>
  )
}