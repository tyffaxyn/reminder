'use client'
import { Button } from '@nextui-org/react'
import { deleteThisReminder } from '@/actions/reminders' 
import { Trash2 } from 'lucide-react'

const DeleteReminder = ({ reminderId }: { reminderId: string }) => {
  return (
    <Button onClick={() => deleteThisReminder(reminderId)} size="sm" isIconOnly color="danger" aria-label="Like">
      <Trash2 />
    </Button>
  )
};

export default DeleteReminder;