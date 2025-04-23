import { useRef } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash/debounce'
import type { ChangeEvent } from 'react'
import { setAdminTableData, setMyTableData, useAppDispatch, useAppSelector } from '../store'
import cloneDeep from 'lodash/cloneDeep'
import { TableQueries } from '@/@types/common'

const OrderTableSearch = () => {

    const dispatch = useAppDispatch()
    const searchInput = useRef<HTMLInputElement>(null)

    const debounceFn = debounce(handleDebounceFn, 500)

    const roles = useAppSelector((state) => state.auth.user.roles)
    const isAdmin = roles?.includes('Admin')

     const initialTableData = useAppSelector((state) =>
            isAdmin ? state.ordersList.data.adminTableData : state.ordersList.data.myTableData
        )

    function handleDebounceFn(val: string) {
        console.log(val);
         const newTableData = cloneDeep(initialTableData)
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
        if (isAdmin) {
            dispatch(setAdminTableData(data))
        } else {
            dispatch(setMyTableData(data))
        }
    }

   
    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        debounceFn(inputValue);
    }

    return (
        <Input
            ref={searchInput}
            className="lg:w-52"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default OrderTableSearch
