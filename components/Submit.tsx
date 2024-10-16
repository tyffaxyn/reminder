'use client'

import { Button, ButtonProps } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

const Submit = ({ label, ...btnProps }: ButtonProps & { label: string }) => {
  const { pending } = useFormStatus()

  return (
    <Button {...btnProps} className="mt-4" type="submit" isLoading={pending}>
      {label}
    </Button>
  )
}

export default Submit