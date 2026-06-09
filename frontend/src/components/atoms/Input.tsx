import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = ({ error, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        className={`
          w-full rounded-lg border px-3 py-2 text-sm text-gray-900
          placeholder:text-gray-400 outline-none transition-all duration-150
          ${error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'
          }
          disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  )
}
