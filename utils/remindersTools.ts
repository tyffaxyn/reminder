import 'server-only'
import prisma from '@/db/db'

import { memoize } from 'nextjs-better-unstable-cache';

type TReminder = {
  title: string;
  day: string;
  time: string;
  ackedAt: Date;
}

export const createReminder = async (userId: string, data: TReminder) => {
  const reminder = await prisma.reminder.create({
    data: {
      title: data.title,
      day: data.day,
      time: data.time,
      ackedAt: data.ackedAt,
      belongsToId: userId,
    }
  });

  return { reminder };
}

export const deleteReminder = async (reminderId: string) => {
  const deleted = await prisma.reminder.delete({
    where: {
      id: reminderId
    }
  })

  return { deleted };
}

export const updateReminder = async (reminderId: string) => {
  const reminder = await prisma.reminder.findUnique({
    where: {
      id: reminderId
    }
  })

  if (!reminder) {
    return {};
  }

  const updated = await prisma.reminder.update({
    where: {
      id: reminderId
    },
    data: {
      ackedAt: new Date(),
    }
  })

  return { updated };
}

export const getAllReminders = memoize(async (userId: string) => {
  const reminders = await prisma.reminder.findMany({
    where: {
      belongsToId: userId
    }
  })

  return reminders;
}, {
  persist: true,
  revalidateTags: () => ['reminders:list'],
  suppressWarnings: true,
  log: ['datacache', 'verbose'],
  logid: 'reminders:list',
})