import { createContext, useContext, useState, ReactNode } from 'react'
import { ITEM_CATEGORIES, STORAGE_LOCATIONS } from '@/lib/constants'

export type Category = string
export type Location = string

interface ManagementContextValue {
  categories: Category[]
  locations: Location[]
  addCategory: (name: string) => void
  renameCategory: (oldName: string, newName: string) => void
  deleteCategory: (name: string) => void
  addLocation: (name: string) => void
  renameLocation: (oldName: string, newName: string) => void
  deleteLocation: (name: string) => void
}

const ManagementContext = createContext<ManagementContextValue | null>(null)

export function ManagementProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([...ITEM_CATEGORIES])
  const [locations, setLocations] = useState<Location[]>([...STORAGE_LOCATIONS])

  function addCategory(name: string) {
    setCategories(prev => [...prev, name.trim()])
  }
  function renameCategory(oldName: string, newName: string) {
    setCategories(prev => prev.map(c => c === oldName ? newName.trim() : c))
  }
  function deleteCategory(name: string) {
    setCategories(prev => prev.filter(c => c !== name))
  }

  function addLocation(name: string) {
    setLocations(prev => [...prev, name.trim()])
  }
  function renameLocation(oldName: string, newName: string) {
    setLocations(prev => prev.map(l => l === oldName ? newName.trim() : l))
  }
  function deleteLocation(name: string) {
    setLocations(prev => prev.filter(l => l !== name))
  }

  return (
    <ManagementContext.Provider value={{
      categories, locations,
      addCategory, renameCategory, deleteCategory,
      addLocation, renameLocation, deleteLocation,
    }}>
      {children}
    </ManagementContext.Provider>
  )
}

export function useManagement() {
  const ctx = useContext(ManagementContext)
  if (!ctx) throw new Error('useManagement must be used inside ManagementProvider')
  return ctx
}
