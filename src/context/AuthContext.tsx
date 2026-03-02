import { createContext, useContext, useState, ReactNode } from 'react'

export interface AuthUser {
  id: string
  username: string
  name: string
  role: 'Dentist' | 'Assistant' | 'Admin'
  initials: string
}

const MOCK_USERS: (AuthUser & { password: string })[] = [
  { id: 'STAFF-001', username: 'ana.reyes',    password: 'password', name: 'Dr. Ana Reyes',  role: 'Dentist',   initials: 'AR' },
  { id: 'STAFF-002', username: 'maria.santos', password: 'password', name: 'Maria Santos',   role: 'Admin',     initials: 'MS' },
  { id: 'STAFF-003', username: 'liza.mendoza', password: 'password', name: 'Liza Mendoza',   role: 'Assistant', initials: 'LM' },
]

interface AuthContextValue {
  user: AuthUser | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  function login(username: string, password: string): boolean {
    const match = MOCK_USERS.find(
      u => u.username === username.trim().toLowerCase() && u.password === password
    )
    if (match) {
      const { password: _pw, ...authUser } = match
      setUser(authUser)
      return true
    }
    return false
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
