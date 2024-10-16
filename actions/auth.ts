'use server'
import { cookies } from 'next/headers'
import { signin, signup } from '@/utils/authTools'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerUser = async (_: FormData, formData: FormData): Promise<{ message: string | null }> => {
    const data = authSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
  
    try {
      const { token } = await signup(data)
      cookies().set(COOKIE_NAME, token)
    } catch (e) {
      console.error(e)
      return { message: 'Failed to sign you up' }
    }
    redirect('/')
}

export const signInUser = async (_: FormData, formData: FormData): Promise<{ message: string | null }> => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signin(data)
    cookies().set(COOKIE_NAME, token)
  } catch (e) {
    console.error(e)
    return { message: 'Failed to sign you in' }
  }
  redirect('/')
}
