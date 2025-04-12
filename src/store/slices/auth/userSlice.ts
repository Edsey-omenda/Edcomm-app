import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    userId?: string,
    fullName?: string,
    email?: string,
    roles?: string[]
    avatar?: string
}


const initialState: UserState = {
    userId: '',
    fullName: '',
    email: '',
    roles: [],
    avatar: '',
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.userId = action.payload?.userId
            state.fullName = action.payload?.fullName
            state.email = action.payload?.email
            state.roles = action.payload?.roles
            state.avatar = action.payload?.avatar
        },
        updateProfileData(state, action: PayloadAction<Partial<UserState>>) {
            if (action.payload.userId !== undefined) state.userId = action.payload.userId
            if (action.payload.fullName !== undefined) state.fullName = action.payload.fullName
            if (action.payload.email !== undefined) state.email = action.payload.email
            if (action.payload.roles !== undefined) state.roles = action.payload.roles
            if (action.payload.avatar !== undefined) state.avatar = action.payload.avatar
        },
    },
})

export const { setUser, updateProfileData } = userSlice.actions
export default userSlice.reducer
