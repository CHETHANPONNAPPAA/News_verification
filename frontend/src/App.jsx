import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Publish from './pages/Publish'
import Verify from './pages/Verify'
import Analytics from './pages/Analytics'
import ProtectedRoute from './components/ProtectedRoute'
import LiveNews from './pages/LiveNews'
import Admin from './pages/Admin'
import ValidatorRoute from './components/ValidatorRoute'
import Blockchain from './pages/Blockchain'
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path='/'
          element={<Login />}
        />

        <Route
          path='/register'
          element={<Register />}
        />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/publish'
          element={
            <ProtectedRoute>
              <Publish />
            </ProtectedRoute>
          }
        />

        <Route
          path='/verify'
          element={
            <ProtectedRoute>
              <Verify />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reports'
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path='/analytics'
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path='/live-news'
          element={
            <ProtectedRoute>
              <LiveNews />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <ValidatorRoute>

              <Admin />

            </ValidatorRoute>
          }
        />
        <Route
          path='/blockchain'
          element={<Blockchain />}
        />
      </Routes>

    </BrowserRouter>

  )
}

export default App