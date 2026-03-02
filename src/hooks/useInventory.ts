import { useState, useMemo } from 'react'
import { mockItems } from '@/data/mockItems'
import { InventoryItem, ItemCategory, StockStatus } from '@/types/inventory.types'

interface FilterState {
  search: string
  category: ItemCategory | 'All'
  status: StockStatus | 'All'
  location: string
}

export function useInventory() {
  const [allItems, setAllItems] = useState<InventoryItem[]>(mockItems)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    status: 'All',
    location: 'All',
  })

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(filters.search.toLowerCase())
      const matchesCategory = filters.category === 'All' || item.category === filters.category
      const matchesStatus = filters.status === 'All' || item.status === filters.status
      const matchesLocation = filters.location === 'All' || item.storageLocation === filters.location
      return matchesSearch && matchesCategory && matchesStatus && matchesLocation
    })
  }, [allItems, filters])

  function addItem(item: InventoryItem) {
    setAllItems(prev => [item, ...prev])
  }

  return { items: filteredItems, filters, setFilters, allItems, addItem }
}
