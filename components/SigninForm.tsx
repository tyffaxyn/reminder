'use client'
import { useFormState } from 'react-dom'
import { Input } from '@nextui-org/react'
import { signInUser } from '@/actions/auth'
import Link from 'next/link'
import Submit from './Submit'

const initState = { message: null }

const SignInForm = () => {
  const [formState, action] = useFormState<{ message: string | null }>(
    signInUser as any,
    initState
  )

  return (
    <form
      action={action}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign in</h3>
      <Input
        fullWidth
        required
        size="lg"
        placeholder="Email"
        name="email"
        type="email"
      />
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
      />
      {formState?.message && <p className="pt-2 pl-2 rounded text-pink-800">{formState.message}</p>}
      <Submit label="Sign in" />
      <div className="mt-4 mb-2">
        <Link href="/signup">
          {"Don't have an account?"}
        </Link>
      </div>
    </form>
  )
}

export default SignInForm
