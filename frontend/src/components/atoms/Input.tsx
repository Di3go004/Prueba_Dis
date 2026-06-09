import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = ({ error, className = '', ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    <input
      className={`
        w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900
        placeholder:text-slate-300 outline-none transition-all duration-150
        ${error
          ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
          : 'border-border-input focus:border-agro focus:ring-2 focus:ring-agro/15'
        }
        disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
    {error && <span className="text-xs text-error">{error}</span>}
  </div>
)
