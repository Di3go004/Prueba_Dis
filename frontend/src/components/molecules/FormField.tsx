import type { InputHTMLAttributes } from 'react'
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

export const FormField = ({ label, error, required, id, ...props }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input id={id} error={error} {...props} />
    </div>
  )
}
