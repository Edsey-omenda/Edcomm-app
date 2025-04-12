export type GetProductsRequest = {
    filterOn?: string;
    filterQuery?: string;
    isAscending?: boolean;
    sortBy?: string;
    pageIndex?: number;
    pageSize?: number;
}

export type GetProductDetailsRequest = {
    id: string
}

export type GenericRequest = {
    id: string
}

export type Size = {
  label: string
  value: string
}

export type Category = {
  label: string
  value: string
}

export type Product = {
    productId: string
    name: string
    description: string
    price: number
    stock: number
    imageUrl: string
    category: string
    color?: string[]
    size?: string[]
    createdAt: string // ISO date from backend
  }

  export type AddEditProduct = {
    id?: string
    name: string
    description: string
    price: number
    stock: number
    imageUrl?: string
    category: string
    color: string[]
    size: string[]
  }
  

  export type ProductsList = Product[]

export type GetProductsResponse = {
  items: ProductsList
  totalItems: number
  filteredItems: number
  beginIndex: number
  endIndex: number
  returnedItems: number
  currentPage: number
  totalPages: number
}

  