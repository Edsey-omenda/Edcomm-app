import { useMemo } from 'react'

function useAuthority(
    userAuthority: string[] = [],
    roles: string[] = [],
    emptyCheck = false
) {

    const roleMatched = useMemo(() => {
        if (!roles || roles.length === 0) {
            // console.log("No roles required — allowing access")
            return !emptyCheck
        }

        const match = roles.some((role) => userAuthority.includes(role))
        // console.log("Comparing:", roles, "vs", userAuthority, "-> Match:", match)
        return match
    }, [roles, userAuthority])

    return roleMatched
}

export default useAuthority
