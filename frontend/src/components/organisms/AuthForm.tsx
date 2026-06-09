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
  const [errors, setErrors] = useState({ nombre: '', email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const change = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [field]: e.target.value }))
    setErrors(p => ({ ...p, [field]: '' }))
  }

  const validate = () => {
    const e = { nombre: '', email: '', password: '' }
    if (mode === 'register' && form.nombre.trim().length < 2)
      e.nombre = 'Mínimo 2 caracteres'
    if (!form.email.includes('@'))
      e.email = 'Email inválido'
    if (form.password.length < 6)
      e.password = 'Mínimo 6 caracteres'
    setErrors(e)
    return !Object.values(e).some(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    setApiError('')
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

  const toggle = () => {
    setMode(m => m === 'login' ? 'register' : 'login')
    setForm({ nombre: '', email: '', password: '' })
    setErrors({ nombre: '', email: '', password: '' })
    setApiError('')
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-border shadow-[0px_10px_30px_rgba(15,23,42,0.1)] px-8 py-9">
          {/* Logo */}
          <div className="flex justify-center mb-7">
            <div className="h-14 w-14 rounded-2xl bg-agro flex items-center justify-center shadow-sm">
              <span className="text-white text-2xl font-bold font-display">D</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-display text-2xl font-semibold text-slate-900 text-center mb-1">
            {mode === 'login' ? 'Bienvenido' : 'Crear cuenta'}
          </h1>
          <p className="text-sm text-slate-400 text-center mb-7">
            {mode === 'login' ? 'Accede al catálogo de Disagro' : 'Regístrate para continuar'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'register' && (
              <FormField id="nombre" label="Nombre completo" placeholder="Tu nombre"
                value={form.nombre} onChange={change('nombre')} error={errors.nombre} required />
            )}
            <FormField id="email" label="Correo electrónico" type="email"
              placeholder="correo@ejemplo.com"
              value={form.email} onChange={change('email')} error={errors.email} required />
            <FormField id="password" label="Contraseña" type="password"
              placeholder="••••••••"
              value={form.password} onChange={change('password')} error={errors.password} required />

            {apiError && (
              <div className="rounded-lg bg-error-light border border-red-200 px-3 py-2.5 text-sm text-error">
                {apiError}
              </div>
            )}

            <Button type="submit" isLoading={isLoading} size="lg" className="w-full mt-1">
              {mode === 'login' ? 'Ingresar' : 'Registrarse'}
            </Button>
          </form>

          <p className="text-sm text-slate-400 text-center mt-6">
            {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button onClick={toggle}
              className="text-agro font-semibold hover:text-agro-dark transition-colors cursor-pointer">
              {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-300 mt-5">
          Disagro · Catálogo Digital © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
