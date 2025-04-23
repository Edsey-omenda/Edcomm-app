import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN, CUSTOMER } from '@/constants/roles.constant'
import pagesRoute from './pagesRoute'

export const publicRoutes: Routes = [...authRoute,  ...pagesRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        roles: [],
    },
    {
        key: 'products.productsDashboard',
        path: '/products/products-dashboard',
        component: lazy(() => import('@/views/Products/ProductsDashboard')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: 'Products Dashboard',
        },
    },
    {
        key: 'products.productsList',
        path: '/products/products-list',
        component: lazy(() => import('@/views/Products/ProductsList')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: '',
        },
    },
    {
        key: 'products.productsList',
        path: '/products/products-list',
        component: lazy(() => import('@/views/Products/ProductsList')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: '',
        },
    },
    {
        key: 'products.productDetails',
        path: '/products/product-Details',
        component: lazy(() => import('@/views/Products/ProductDetails')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: '',
        },
    },
    {
        key: 'products.productNew',
        path: '/products/product-new',
        component: lazy(() => import('@/views/Products/NewProduct')),
        roles: [ADMIN],
        meta: {
            header: 'Add New Product',
        },
    },
    {
        key: 'products.productEdit',
        path: '/products/product-edit/:id',
        component: lazy(() => import('@/views/Products/EditProduct')),
        roles: [ADMIN],
        meta: {
            header: 'Edit Product',
        },
    },
    {
        key: 'orders.ordersDashboard',
        path: '/orders/orders-dashboard',
        component: lazy(() => import('@/views/Orders/OrdersDashboard')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: 'Orders Dashboard',
        },
    },
    {
        key: 'orders.ordersList',
        path: '/orders/orders-list',
        component: lazy(() => import('@/views/Orders/OrderList')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: 'Orders List',
        },
    },
    {
        key: 'orders.orderDetails',
        path: '/orders/order-details/:id',
        component: lazy(() => import('@/views/Orders/OrderDetails')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: '',
        },
    },
    {
        key: 'orders.newOrder',
        path: '/orders/new-order',
        component: lazy(() => import('@/views/Orders/NewOrder')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: 'New Order',
        }
    },
    {
        key: 'orders.editOrder',
        path: '/orders/edit-order',
        component: lazy(() => import('@/views/Orders/EditOrder')),
        roles: [ADMIN],
        meta: {
            header: '',
        },
    },
    {
        key: 'cart.cartScreen',
        path: '/cart/your-cart',
        component: lazy(() => import('@/views/Cart/Cart')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: '',
        },
    },
    {
        key: 'cart.checkout',
        path: '/checkout/payment',
        component: lazy(() => import('@/views/Checkout/Checkout')),
        roles: [ADMIN, CUSTOMER],
        meta: {
            header: '',
        },
    }
]