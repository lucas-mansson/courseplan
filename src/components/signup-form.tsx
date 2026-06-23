'use client'

import { signUp } from '@/lib/actions/auth'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useActionState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Label } from './ui/label'
import { Input } from './ui/input'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signUp, undefined)
  const router = useRouter()

  return (
    <Card className="w-full max-w-sm">
      <form action={action} className='w-full flex flex-col gap-4'>
        <CardHeader>
          <CardTitle>Sign up for CoursePlan</CardTitle>
          <CardAction>
            <Button disabled={pending} onClick={() => router.push("/sign-in")} variant="link">
              Already have an account?
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div>
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                name='name'
                required
              />
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name='email'
                placeholder="email@example.com"
                required
              />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name='password' type="password" required />
            </div>
            {state?.errors?.password && (
              <div>
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button disabled={pending} type="submit" className="w-full">
            Sign Up
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
