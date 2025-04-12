import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const pagesRoute: Routes = [
    {
        key: 'pages.accessDenied',
        path: '/access-denied',
        component: lazy(() => import('@/views/AccessDenied/AccessDenied')),
        roles: [],
    },
]

export default pagesRoute
