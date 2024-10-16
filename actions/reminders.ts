'use server'

import { z } from 'zod'
import { createReminder, deleteReminder, updateReminder } from '@/utils/remindersTools'
import { revalidateTag } from 'next/cache'

const authSchema = z.object({
  title: z.string(),
  day: z.string(),
  time: z.string().time(),
})

export const createNewReminder = async (userId: string, formData: FormData) => {
  const data = authSchema.parse({
    title: formData.get('title'),
    day: formData.get('day'),
    time: `${formData.get('time')}:00`,
  });

  try {
    await createReminder(userId, { ...data, ackedAt: new Date()});
  } catch (e) {
    console.error(e)
    return { message: 'Failed to create reminder' }
  }

  revalidateTag('reminders:list')
}

export const deleteThisReminder = async (reminderId: string) => {
  try {
    await deleteReminder(reminderId);
  } catch (e) {
    console.error(e)
    return { message: 'Failed to create reminder' }
  }

  revalidateTag('reminders:list')
}

export const updateThisReminder = async (reminderId: string) => {
  try {
    await updateReminder(reminderId);
  } catch (e) {
    console.error(e)
    return { message: 'Failed to update reminder' }
  }

  revalidateTag('reminders:list')
}