import type { Categoria } from '../../types'

interface BadgeProps {
  categoria: Categoria
  className?: string
}

// Pill-shaped badges: low-saturation bg + high-saturation text (per DESIGN.md)
const colorMap: Record<string, string> = {
  Fertilizantes: 'bg-agro-light text-agro-dark border border-agro-border',
  Maquinaria:    'bg-blue-50 text-blue-700 border border-blue-200',
  Semillas:      'bg-gold-light text-yellow-800 border border-yellow-300',
  Agroquimicos:  'bg-purple-50 text-purple-700 border border-purple-200',
}

export const Badge = ({ categoria, className = '' }: BadgeProps) => {
  const colors = colorMap[categoria] ?? 'bg-slate-100 text-slate-600 border border-slate-200'

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors} ${className}`}>
      {categoria}
    </span>
  )
}
