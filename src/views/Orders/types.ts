export type OrderItem = {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
};

export type Order = {
    orderId: string
    status: string
    orderDate: string
    totalAmount: number
    customerName?: string; // Only used in Admin view
    items: OrderItem[]
};

export type GetOrdersListRequest = {
    filterOn?: string;
    filterQuery?: string;
    isAscending?: boolean;
    sortBy?: string;
    pageIndex?: number;
    pageSize?: number;
};

export type GetOrderByIdRequest = {
    orderId: string
};

export type OrdersList = Order[]

export type GetOrdersListResponse = {
      items: OrdersList
      totalItems: number
      filteredItems: number
      beginIndex: number
      endIndex: number
      returnedItems: number
      currentPage: number
      totalPages: number
}