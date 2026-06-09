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
    codigo: string; nombre: string; descripcion: string
    precio: number; categoria: string
  }) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const categoriaOptions = Object.values(Categoria).map((c) => ({ value: c, label: c }))
const initial: ProductFormData = { codigo: '', nombre: '', descripcion: '', precio: '', categoria: '' }

export const ProductForm = ({ onSubmit, onCancel, isLoading }: ProductFormProps) => {
  const [form, setForm] = useState<ProductFormData>(initial)
  const [errors, setErrors] = useState<Partial<ProductFormData>>({})

  const validate = () => {
    const e: Partial<ProductFormData> = {}
    if (!form.codigo.trim()) e.codigo = 'El código es requerido'
    if (form.nombre.trim().length < 2) e.nombre = 'Mínimo 2 caracteres'
    if (form.descripcion.trim().length < 10) e.descripcion = 'Mínimo 10 caracteres'
    if (!form.precio || isNaN(Number(form.precio)) || Number(form.precio) <= 0)
      e.precio = 'Ingresa un precio válido mayor a 0'
    if (!form.categoria) e.categoria = 'Selecciona una categoría'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const change = (field: keyof ProductFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(p => ({ ...p, [field]: e.target.value }))
      setErrors(p => ({ ...p, [field]: undefined }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await onSubmit({ ...form, precio: Number(form.precio) })
    setForm(initial)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="codigo" label="Código" placeholder="Ej: PROD-001"
          value={form.codigo} onChange={change('codigo')} error={errors.codigo} required />
        <FormField id="nombre" label="Nombre" placeholder="Nombre del producto"
          value={form.nombre} onChange={change('nombre')} error={errors.nombre} required />
      </div>
      <FormField id="descripcion" label="Descripción"
        placeholder="Descripción detallada (mínimo 10 caracteres)"
        value={form.descripcion} onChange={change('descripcion')} error={errors.descripcion} required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="precio" label="Precio (Q)" type="number" placeholder="0.00" min="0" step="0.01"
          value={form.precio} onChange={change('precio')} error={errors.precio} required />
        <SelectField id="categoria" label="Categoría" options={categoriaOptions}
          value={form.categoria} onChange={change('categoria')} error={errors.categoria} required />
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-border">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" isLoading={isLoading}>Guardar producto</Button>
      </div>
    </form>
  )
}
