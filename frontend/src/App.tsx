import { useAuth } from './context/AuthContext'
import { AuthForm } from './components/organisms/AuthForm'
import { ProductsPage } from './pages/ProductsPage'

function App() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <ProductsPage /> : <AuthForm />
}

export default App