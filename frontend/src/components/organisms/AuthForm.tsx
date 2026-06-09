import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { loginApi, registerApi } from '../../api/auth.api'
import { Button } from '../atoms/Button'
import { FormField } from '../molecules/FormField'

type Mode = 'login' | 'register'

export const AuthForm = () => {
  const { login } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [errors, setErrors] = useState<typeof form>({ nombre: '', email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setApiError('')
  }

  const validate = (): boolean => {
    const newErrors = { nombre: '', email: '', password: '' }
    if (mode === 'register' && form.nombre.trim().length < 2)
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres'
    if (!form.email.includes('@'))
      newErrors.email = 'Email inválido'
    if (form.password.length < 6)
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    try {
      const result = mode === 'login'
        ? await loginApi({ email: form.email, password: form.password })
        : await registerApi(form)
      login(result.token, result.user)
    } catch {
      setApiError(
        mode === 'login'
          ? 'Credenciales incorrectas. Verifica tu email y contraseña.'
          : 'No se pudo registrar. El email podría ya estar en uso.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'))
    setForm({ nombre: '', email: '', password: '' })
    setErrors({ nombre: '', email: '', password: '' })
    setApiError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">D</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 text-center mb-1">
          {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          {mode === 'login' ? 'Accede al catálogo de Disagro' : 'Regístrate para continuar'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'register' && (
            <FormField
              id="nombre"
              label="Nombre"
              placeholder="Tu nombre completo"
              value={form.nombre}
              onChange={handleChange('nombre')}
              error={errors.nombre}
              required
            />
          )}
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
            required
          />
          <FormField
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange('password')}
            error={errors.password}
            required
          />

          {apiError && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
              {apiError}
            </p>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full mt-1">
            {mode === 'login' ? 'Ingresar' : 'Registrarse'}
          </Button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={toggleMode}
            className="text-green-600 font-medium hover:underline cursor-pointer"
          >
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  )
}
