import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'


export interface SessionState {
    signedIn: boolean
    token: TokenState | null
}

export interface TokenState {
    accessToken: string,
    tokenType: string,
    expiresIn: number  
}

const initialState: SessionState = {
    signedIn: false,
    token: null,
}

const sessionSlice = createSlice({
    name: `${SLICE_BASE_NAME}/session`,
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<TokenState>) {
            state.signedIn = true
            state.token = action.payload
        },
        signOutSuccess(state) {
            state.signedIn = false
            state.token = null
        },
    },
})

export const { signInSuccess, signOutSuccess } = sessionSlice.actions
export default sessionSlice.reducer
