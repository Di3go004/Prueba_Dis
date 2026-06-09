import { useAuth } from '../../context/AuthContext'
import { Button } from '../atoms/Button'

export const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900">Disagro</h1>
            <p className="text-xs text-gray-400">Catálogo de Productos</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.nombre}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
