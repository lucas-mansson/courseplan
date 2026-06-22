'use client'

import { signIn } from '@/lib/actions/auth'
import { useActionState } from 'react'

export default function SignInForm() {
  const [state, action, pending] = useActionState(signIn, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>

      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  )
}
