import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import AppLayout from '@/components/layout/AppLayout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import InventoryList from '@/pages/InventoryList'
import ItemDetail from '@/pages/ItemDetail'
import ReceiveStock from '@/pages/ReceiveStock'
import UsageLog from '@/pages/UsageLog'
import Alerts from '@/pages/Alerts'
import Reports from '@/pages/Reports'
import AuditLog from '@/pages/AuditLog'
import Suppliers from '@/pages/Suppliers'
import Settings from '@/pages/Settings'

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/" element={user ? <AppLayout /> : <Navigate to="/login" replace />}>
        <Route index element={<Dashboard />} />
        <Route path="inventory" element={<InventoryList />} />
        <Route path="inventory/:itemId" element={<ItemDetail />} />
        <Route path="receive-stock" element={<ReceiveStock />} />
        <Route path="usage-log" element={<UsageLog />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="audit-log" element={<AuditLog />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/DentalInventory">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
