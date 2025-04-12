import { ChangeEvent, useRef } from 'react'
import Container from '@/components/shared/Container'
import {
    useAppDispatch,
    useAppSelector,
    setProductsData,
    getProducts,
} from '../store'
import InputGroup from '@/components/ui/InputGroup'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import { TableQueries } from '@/@types/common'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'
import { ADMIN } from '@/constants/roles.constant'
import { Button } from '@/components/ui/Button'


const ProductSearch = () => {
    const dispatch = useAppDispatch()

    const searchInput = useRef<HTMLInputElement>(null)

    const tableData = useAppSelector(
        (state) => state.productList.productsData
    )

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data: TableQueries) => {
        dispatch(setProductsData(data))
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
            ref={searchInput}
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Search product"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default ProductSearch
