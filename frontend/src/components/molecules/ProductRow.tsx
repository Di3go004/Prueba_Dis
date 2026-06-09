import type { Product } from '../../types'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'

interface ProductRowProps {
  product: Product
  index: number
  onDelete: (id: string) => void
  isDeleting?: boolean
}

export const ProductRow = ({ product, index, onDelete, isDeleting }: ProductRowProps) => {
  const precio = typeof product.precio === 'number'
    ? product.precio
    : parseFloat(String(product.precio))

  // Zebra stripe: even rows slightly tinted per DESIGN.md
  const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50'

  return (
    <tr className={`${rowBg} border-b border-border hover:bg-agro-light/30 transition-colors duration-100`}>
      <td className="px-4 py-3 text-xs font-mono text-slate-500 tracking-wide">{product.codigo}</td>
      <td className="px-4 py-3 text-sm font-medium text-slate-900">{product.nombre}</td>
      <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">{product.descripcion}</td>
      <td className="px-4 py-3 text-sm font-semibold text-slate-900">
        Q{precio.toFixed(2)}
      </td>
      <td className="px-4 py-3">
        <Badge categoria={product.categoria} />
      </td>
      <td className="px-4 py-3 text-right">
        <Button
          variant="ghost"
          size="sm"
          isLoading={isDeleting}
          onClick={() => onDelete(product.id)}
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          {!isDeleting && (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
          Eliminar
        </Button>
      </td>
    </tr>
  )
}
