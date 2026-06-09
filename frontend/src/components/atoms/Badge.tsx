import type { Categoria } from '../../types'

interface BadgeProps {
  categoria: Categoria
  className?: string
}

const colorMap: Record<string, string> = {
  Fertilizantes: 'bg-green-100 text-green-700 ring-green-200',
  Maquinaria:    'bg-blue-100 text-blue-700 ring-blue-200',
  Semillas:      'bg-yellow-100 text-yellow-700 ring-yellow-200',
  Agroquimicos:  'bg-purple-100 text-purple-700 ring-purple-200',
}

export const Badge = ({ categoria, className = '' }: BadgeProps) => {
  const colors = colorMap[categoria] ?? 'bg-gray-100 text-gray-700 ring-gray-200'

  return (
    <span
      className={`
        inline-flex items-center rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset
        ${colors} ${className}
      `}
    >
      {categoria}
    </span>
  )
}
