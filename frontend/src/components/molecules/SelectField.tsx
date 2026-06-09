import type { SelectHTMLAttributes } from 'react'
import { Label } from '../atoms/Label'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  required?: boolean
  options: { value: string; label: string }[]
}

export const SelectField = ({
  label,
  error,
  required,
  id,
  options,
  className = '',
  ...props
}: SelectFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select
        id={id}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm text-gray-900
          outline-none transition-all duration-150 bg-white cursor-pointer
          ${error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'
          }
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        <option value="">Seleccionar...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
