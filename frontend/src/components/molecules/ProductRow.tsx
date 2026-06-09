import type { Product } from '../../types'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'

interface ProductRowProps {
  product: Product
  onDelete: (id: string) => void
  isDeleting?: boolean
}

export const ProductRow = ({ product, onDelete, isDeleting }: ProductRowProps) => {
  const precio = typeof product.precio === 'number'
    ? product.precio
    : parseFloat(String(product.precio))

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100">
      <td className="px-4 py-3 text-sm font-mono text-gray-500">{product.codigo}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.nombre}</td>
      <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{product.descripcion}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        Q{precio.toFixed(2)}
      </td>
      <td className="px-4 py-3">
        <Badge categoria={product.categoria} />
      </td>
      <td className="px-4 py-3 text-right">
        <Button
          variant="danger"
          size="sm"
          isLoading={isDeleting}
          onClick={() => onDelete(product.id)}
        >
          Eliminar
        </Button>
      </td>
    </tr>
  )
}
