import { useState } from 'react'
import { Categoria } from '../../types'
import { Button } from '../atoms/Button'
import { FormField } from '../molecules/FormField'
import { SelectField } from '../molecules/SelectField'

interface ProductFormData {
  codigo: string
  nombre: string
  descripcion: string
  precio: string
  categoria: string
}

interface ProductFormProps {
  onSubmit: (data: {
    codigo: string
    nombre: string
    descripcion: string
    precio: number
    categoria: string
  }) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const categoriaOptions = Object.values(Categoria).map((c) => ({ value: c, label: c }))

const initialState: ProductFormData = {
  codigo: '',
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: '',
}

export const ProductForm = ({ onSubmit, onCancel, isLoading }: ProductFormProps) => {
  const [form, setForm] = useState<ProductFormData>(initialState)
  const [errors, setErrors] = useState<Partial<ProductFormData>>({})

  const validate = (): boolean => {
    const newErrors: Partial<ProductFormData> = {}
    if (!form.codigo.trim()) newErrors.codigo = 'El código es requerido'
    if (form.nombre.trim().length < 2) newErrors.nombre = 'Mínimo 2 caracteres'
    if (form.descripcion.trim().length < 10) newErrors.descripcion = 'Mínimo 10 caracteres'
    if (!form.precio || isNaN(Number(form.precio)) || Number(form.precio) <= 0)
      newErrors.precio = 'Ingresa un precio válido mayor a 0'
    if (!form.categoria) newErrors.categoria = 'Selecciona una categoría'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof ProductFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await onSubmit({
      ...form,
      precio: Number(form.precio),
    })
    setForm(initialState)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="codigo"
          label="Código"
          placeholder="Ej: PROD-001"
          value={form.codigo}
          onChange={handleChange('codigo')}
          error={errors.codigo}
          required
        />
        <FormField
          id="nombre"
          label="Nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange('nombre')}
          error={errors.nombre}
          required
        />
      </div>

      <FormField
        id="descripcion"
        label="Descripción"
        placeholder="Descripción detallada del producto (mínimo 10 caracteres)"
        value={form.descripcion}
        onChange={handleChange('descripcion')}
        error={errors.descripcion}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="precio"
          label="Precio (Q)"
          type="number"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={form.precio}
          onChange={handleChange('precio')}
          error={errors.precio}
          required
        />
        <SelectField
          id="categoria"
          label="Categoría"
          options={categoriaOptions}
          value={form.categoria}
          onChange={handleChange('categoria')}
          error={errors.categoria}
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Guardar producto
        </Button>
      </div>
    </form>
  )
}
