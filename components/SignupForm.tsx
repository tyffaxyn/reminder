'use client'
import { Input } from '@nextui-org/react'
import Link from 'next/link'
import { useFormState } from 'react-dom'

import { registerUser } from '@/actions/auth'
import Submit from './Submit'

const initState = { message: null }

const SignUpForm = () => {
  const [formState, action] = useFormState<{ message: string | null }>(
    registerUser as any,
    initState
  )

  return (
    <form
      action={action}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign up</h3>
      <Input fullWidth size="lg" placeholder="Email" name="email" required />
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
      />
      {formState?.message && <p className="p-2 rounded text-pink-800">{formState.message}</p>}
      <Submit label="Sign up" />
      <div className="mt-4 mb-2">
        <Link href="/signin">
          Already have an account?
        </Link>
      </div>
    </form>
  )
}

export default SignUpForm

