import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, ProductDetailsState } from './ProductDetailsSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: ProductDetailsState
      }
> = useSelector

export * from './ProductDetailsSlice'
export { useAppDispatch } from '@/store'
export default reducer
