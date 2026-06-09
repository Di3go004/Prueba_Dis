import type { SelectHTMLAttributes } from 'react'
import { Label } from '../atoms/Label'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  required?: boolean
  options: { value: string; label: string }[]
}

export const SelectField = ({
  label, error, required, id, options, className = '', ...props
}: SelectFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor={id} required={required}>{label}</Label>
    <select
      id={id}
      className={`
        w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900
        outline-none transition-all duration-150 cursor-pointer
        ${error
          ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
          : 'border-border-input focus:border-agro focus:ring-2 focus:ring-agro/15'
        }
        disabled:bg-slate-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      <option value="">Seleccionar...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <span className="text-xs text-error">{error}</span>}
  </div>
)
