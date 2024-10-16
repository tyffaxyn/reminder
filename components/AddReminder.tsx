'use client'
import { Button } from '@nextui-org/react'
import { CalendarPlus2 } from 'lucide-react'
import { useState } from 'react'
import ReminderModal from '@/components/ReminderModal'
import { createNewReminder } from '@/actions/reminders' 

const AddReminder = ({ userId }: { userId: string }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const closeHandler = () => {
    setOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="success" endContent={<CalendarPlus2 />}>
        Add reminder
      </Button>
      <ReminderModal 
        isOpen={openModal} 
        onClose={closeHandler} 
        onFormSubmit={async (_, state) => {
          await createNewReminder(userId, state);
          closeHandler();
        }}
      />
    </>
  )
};

export default AddReminder;
