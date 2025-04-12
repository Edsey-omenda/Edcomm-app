import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const authRoute: Routes = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn')),
        roles: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        roles: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        roles: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        roles: [],
    },
]

export default authRoute
