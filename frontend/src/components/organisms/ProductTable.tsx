import type { Product } from '../../types'
import { ProductRow } from '../molecules/ProductRow'
import { Spinner } from '../atoms/Spinner'

interface ProductTableProps {
  products: Product[]
  isLoading: boolean
  deletingId: string | null
  onDelete: (id: string) => void
}

export const ProductTable = ({ products, isLoading, deletingId, onDelete }: ProductTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-300">
        <svg className="h-14 w-14 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <p className="text-sm font-medium text-slate-400">No hay productos registrados</p>
        <p className="text-xs text-slate-300 mt-1">Agrega tu primer producto con el botón de arriba</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
      <table className="w-full text-left">
        {/* Header: uppercase label-md per DESIGN.md */}
        <thead className="bg-slate-50 border-b border-border">
          <tr>
            {['Código', 'Nombre', 'Descripción', 'Precio', 'Categoría', 'Acciones'].map((col, i) => (
              <th
                key={col}
                className={`px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider ${i === 5 ? 'text-right' : ''}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              index={index}
              onDelete={onDelete}
              isDeleting={deletingId === product.id}
            />
          ))}
        </tbody>
        {/* Footer */}
        <tfoot className="bg-slate-50 border-t border-border">
          <tr>
            <td colSpan={6} className="px-4 py-2.5 text-center">
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <span className="text-xs">Fin de los resultados.</span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
