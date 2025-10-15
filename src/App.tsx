import './App.css'
import { AuthProvider } from './hooks/AuthContext.tsx'
import AppRouter from './routes/index.tsx'

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
