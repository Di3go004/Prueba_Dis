import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: ReactNode
}

const variants = {
  primary:   'bg-agro text-white hover:bg-agro-hover active:bg-agro-dark shadow-sm',
  secondary: 'bg-white border border-slate-900 text-slate-900 hover:bg-slate-50 shadow-sm',
  danger:    'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  ghost:     'bg-transparent text-slate-500 hover:bg-slate-100',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs font-medium',
  md: 'px-4 py-2 text-sm font-medium',
  lg: 'px-5 py-2.5 text-sm font-semibold',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) => (
  <button
    disabled={disabled || isLoading}
    className={`
      inline-flex items-center justify-center gap-2
      rounded-lg transition-all duration-150 cursor-pointer
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]} ${sizes[size]} ${className}
    `}
    {...props}
  >
    {isLoading && (
      <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
    )}
    {children}
  </button>
)
