'use client'
import { useFormState } from 'react-dom'
import { 
  Modal, ModalContent, ModalHeader, ModalBody, 
  ModalFooter, Button, Input, Select, SelectItem 
} from "@nextui-org/react"
import { DAYS_LIST } from '@/utils/constants'
import Submit from './Submit'

type FormState = { message: string | null };
type ReminderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onFormSubmit: (_: FormData, state: FormData) => void;
}

const initState = { message: null }

const ReminderModal = ({ isOpen, onClose, onFormSubmit }: ReminderModalProps) => {
  const [_, action] = useFormState<FormState>(
    onFormSubmit as any,
    initState
  )

  return (
    <Modal 
      size="xl" 
      isOpen={isOpen} 
      onClose={onClose} 
    >
      <ModalContent>
        {(onClose) => (
          <form
            action={action}
            className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
          >
            <ModalHeader className="flex flex-col gap-1">Create a reminder</ModalHeader>
            <ModalBody>
              <Input
                fullWidth
                required
                size="lg"
                placeholder="Title"
                name="title"
                type="text"
              />
              <Select
                items={DAYS_LIST}
                label="Select day"
                name="day"
                size="sm"
                defaultSelectedKeys={["Monday"]}
                placeholder="Monday"
              >
                {(day) => <SelectItem key={day.key}>{day.label}</SelectItem>}
              </Select>
              <Input
                fullWidth
                required
                size="lg"
                placeholder="Time"
                name="time"
                type="time"
              />
            </ModalBody>
            <ModalFooter>
              <Button className="mt-4" color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Submit color="primary" label="Create" />
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ReminderModal;
