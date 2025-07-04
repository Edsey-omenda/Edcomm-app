import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthority from '@/utils/hooks/useAuthority'
import AccessDenied from '@/views/AccessDenied/AccessDenied'

type AuthorityGuardProps = PropsWithChildren<{
    userAuthority?: string[]
    roles?: string[]
}>

const AuthorityGuard = (props: AuthorityGuardProps) => {
    const { userAuthority = [], roles = [], children } = props
    const roleMatched = useAuthority(userAuthority, roles ?? [])

    //return <>{roleMatched ? children : <AccessDenied />}</>
    return roleMatched ? <>{children}</> : <Navigate to='/access-denied' replace />

}

export default AuthorityGuard

