import { useAuth } from '../../context/AuthContext'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

const NavItem = ({ icon, label, active }: NavItemProps) => (
  <div
    className={`
      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
      transition-colors duration-150
      ${active
        ? 'bg-sidebar-active-bg text-sidebar-active-text'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 cursor-pointer'
      }
    `}
  >
    <span className={`flex-shrink-0 ${active ? 'text-agro' : 'text-slate-400'}`}>{icon}</span>
    {label}
  </div>
)

export const Sidebar = () => {
  const { user, logout } = useAuth()
  const initials = user?.nombre?.charAt(0).toUpperCase() ?? 'U'

  return (
    <aside className="h-full w-[210px] flex-shrink-0 flex flex-col bg-sidebar-bg border-r border-border">

      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-agro flex items-center justify-center flex-shrink-0">
            <span className="text-white text-base font-bold font-display">D</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 font-display leading-tight">DISAGRO</p>
            <p className="text-xs text-slate-400 leading-tight">Catálogo Digital</p>
          </div>
        </div>
      </div>

      {/* Nav — solo las secciones disponibles */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <NavItem
          icon={
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          }
          label="Productos"
          active
        />
      </nav>

      {/* Bottom — usuario + logout */}
      <div className="px-3 py-4 border-t border-border flex flex-col gap-2">
        {/* User chip */}
        {user && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-50">
            <div className="h-7 w-7 rounded-full bg-agro flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{user.nombre}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 text-left cursor-pointer"
        >
          <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
