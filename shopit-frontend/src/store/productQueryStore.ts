import { create } from 'zustand'

export interface Range {
  min: number
  max: number
}
export interface ProductQuery {
  searchText?: string
  sortOrder?: string
  priceRange?: Range
  collectionId?: number
}

interface ProductQueryStore {
  productQuery: ProductQuery
  setProductQuery: (searchText: string) => void
  setSortOrder: (order: string) => void
  setPriceRange: (range: Range) => void
  setCollectionId: (collectionId: number | undefined) => void
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: {} as ProductQuery,
  setProductQuery: (searchText) =>
    set((store) => ({
      productQuery: { ...store.productQuery, searchText: searchText },
    })),
  setSortOrder: (order) =>
    set((store) => ({
      productQuery: { ...store.productQuery, sortOrder: order },
    })),
  setPriceRange: (range) =>
    set((store) => ({
      productQuery: { ...store.productQuery, priceRange: range },
    })),
  setCollectionId: (collectionId) =>
    set((store) => ({
      productQuery: { ...store.productQuery, collectionId: collectionId },
    })),
}))

export default useProductQueryStore
