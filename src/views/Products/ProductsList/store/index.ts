import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, ProductListState } from './ProductListSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    // RootState & {
    //     [SLICE_NAME]: {
    //         data: ProductListState
    //     }
    // }
    RootState & {
        [SLICE_NAME]: ProductListState
      }
> = useSelector

export * from './ProductListSlice'
export { useAppDispatch } from '@/store'
export default reducer
