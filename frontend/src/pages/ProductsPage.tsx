import { useState, useEffect, useCallback } from 'react'
import type { Product } from '../types'
import { getProductsApi, createProductApi, deleteProductApi } from '../api/product.api'
import { Navbar } from '../components/organisms/Navbar'
import { ProductTable } from '../components/organisms/ProductTable'
import { ProductForm } from '../components/organisms/ProductForm'
import { Button } from '../components/atoms/Button'

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await getProductsApi()
      setProducts(data)
    } catch {
      setError('No se pudo cargar el listado de productos.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleCreate = async (data: {
    codigo: string
    nombre: string
    descripcion: string
    precio: number
    categoria: string
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
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch {
      setError('No se pudo eliminar el producto.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header de la sección */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Catálogo de productos</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {products.length} {products.length === 1 ? 'producto registrado' : 'productos registrados'}
            </p>
          </div>
          <Button onClick={() => { setShowForm((v) => !v); setError('') }}>
            {showForm ? 'Cancelar' : '+ Agregar producto'}
          </Button>
        </div>

        {/* Mensaje de error global */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Formulario de creación (colapsable) */}
        {showForm && (
          <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Nuevo producto</h3>
            <ProductForm
              onSubmit={handleCreate}
              onCancel={() => { setShowForm(false); setError('') }}
              isLoading={isCreating}
            />
          </div>
        )}

        {/* Tabla de productos */}
        <ProductTable
          products={products}
          isLoading={isLoading}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}
