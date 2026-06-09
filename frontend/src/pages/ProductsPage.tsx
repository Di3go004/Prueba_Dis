import { useState, useEffect, useCallback } from 'react'
import type { Product } from '../types'
import { Categoria } from '../types'
import { getProductsApi, createProductApi, deleteProductApi } from '../api/product.api'
import { Sidebar } from '../components/organisms/Sidebar'
import { ProductTable } from '../components/organisms/ProductTable'
import { ProductForm } from '../components/organisms/ProductForm'
import { Button } from '../components/atoms/Button'

type Filter = 'all' | Categoria

const filterOptions: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  ...Object.values(Categoria).map(c => ({ value: c as Filter, label: c })),
]

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      setProducts(await getProductsApi())
    } catch {
      setError('No se pudo cargar el listado de productos.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.categoria === activeFilter)

  const handleCreate = async (data: {
    codigo: string; nombre: string; descripcion: string; precio: number; categoria: string
  }) => {
    setIsCreating(true)
    try {
      await createProductApi(data as Parameters<typeof createProductApi>[0])
      await fetchProducts()
      setShowForm(false)
    } catch {
      setError('No se pudo crear el producto. Verifica los datos e intenta de nuevo.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteProductApi(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch {
      setError('No se pudo eliminar el producto.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="flex h-full overflow-hidden bg-surface">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          {/* Page header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                Catálogo de productos
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                {products.length} {products.length === 1 ? 'producto registrado' : 'productos registrados'}
              </p>
            </div>
            <Button
              onClick={() => { setShowForm(v => !v); setError('') }}
              className="flex-shrink-0"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
              </svg>
              {showForm ? 'Cancelar' : 'Agregar producto'}
            </Button>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-error-light border border-red-200 px-4 py-3 text-sm text-error">
              <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {error}
            </div>
          )}

          {/* Create form panel */}
          {showForm && (
            <div className="mb-5 bg-white rounded-xl border border-border shadow-[0px_4px_20px_rgba(15,23,42,0.05)] p-6">
              <h3 className="font-display text-base font-semibold text-slate-900 mb-4">
                Nuevo producto
              </h3>
              <ProductForm
                onSubmit={handleCreate}
                onCancel={() => { setShowForm(false); setError('') }}
                isLoading={isCreating}
              />
            </div>
          )}

          {/* Category filter chips */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {filterOptions.map(({ value, label }) => {
              const isActive = activeFilter === value
              return (
                <button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  className={`
                    px-3.5 py-1.5 rounded-full text-xs font-medium
                    border transition-all duration-150 cursor-pointer
                    ${isActive
                      ? 'bg-agro text-white border-agro shadow-sm'
                      : 'bg-white text-slate-500 border-border hover:border-agro-border hover:text-agro-dark'
                    }
                  `}
                >
                  {label}
                </button>
              )
            })}

            {activeFilter !== 'all' && (
              <span className="text-xs text-slate-400 ml-1">
                {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Products table */}
          <ProductTable
            products={filtered}
            isLoading={isLoading}
            deletingId={deletingId}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  )
}
