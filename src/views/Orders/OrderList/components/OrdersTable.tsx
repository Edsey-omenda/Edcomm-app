import { useCallback, useEffect, useMemo, useRef } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { NumericFormat } from 'react-number-format'
import type {
    DataTableResetHandle,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import { getAdminOrders, getMyOrders, setAdminTableData, setMyTableData, useAppDispatch, useAppSelector } from '../store'
import cloneDeep from 'lodash/cloneDeep'
import Tag from '@/components/ui/Tag'
import { HiOutlineEye } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'

const ActionColumn = ({ row }: { row: any }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/orderlist/${row.Id}`)
        //console.log("Order-details", row)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
        </div>
    )
}
  
const OrdersTable = () => {

    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch();

    const roles = useAppSelector((state) => state.auth.user.roles)
    const isAdmin = roles?.includes('Admin')

    const initialTableData = useAppSelector((state) =>
        isAdmin ? state.ordersList.data.adminTableData : state.ordersList.data.myTableData
    )

    const data = useAppSelector((state) =>
        isAdmin ? state.ordersList.data.adminOrders : state.ordersList.data.myOrders
    )


    const loading = useAppSelector((state) => state.ordersList.data.loading)
    
    const fetchData = useCallback(() => {
        const { pageIndex, pageSize, query } = initialTableData

        const params = {
            pageIndex: pageIndex ?? 1,
            pageSize: pageSize ?? 25,
            filterQuery: query || '',
            filterOn: 'Name',
            isAscending: true,
        }

        if (isAdmin) {
            dispatch(getAdminOrders(params))
        } else {
            dispatch(getMyOrders(params))
        }
    }, [dispatch, isAdmin, initialTableData])


    useEffect(() => {
        fetchData()
    }, [fetchData]);
    
    const columns: ColumnDef<any>[] = useMemo(
        () => [
            {
                header: 'Created',
                accessorKey: 'orderDate',
                enableSorting: false,
                cell: (props) => {
                    const row = props.row.original
                    const date = new Date(row.CreatedDate)
                    return (
                        <span>{date.toLocaleDateString()}</span>
                    )
                },
            },
            {
                header: 'Customer',
                accessorKey: 'customerName',
                enableSorting: false,
            },
            {
                header: 'Status',
                accessorKey: 'status',
                enableSorting: false,
                cell: (props) => {
                    const { Status, StatusColour } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag style={{ color: StatusColour, backgroundColor: `${StatusColour}20`  }} 
                            className="rounded border-0"
                            >
                                {Status}
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: '$ Total',
                accessorKey: 'totalAmount',
                enableSorting: false,
                cell: (props) => {
                    const { PriceTotal } = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={(Math.round(PriceTotal * 100) / 100).toFixed(2)}
                            prefix={'$'}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(initialTableData)
        newTableData.pageIndex = page

        if (isAdmin) {
            dispatch(setAdminTableData(newTableData))
        } else {
            dispatch(setMyTableData(newTableData))
        }
    }
    
    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(initialTableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1

        if (isAdmin) {
            dispatch(setAdminTableData(newTableData))
        } else {
            dispatch(setMyTableData(newTableData))
        }
    }
    
    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={{
                    total: initialTableData.total as number,
                    pageIndex: initialTableData.pageIndex as number,
                    pageSize: initialTableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
            />
        </>
    )
}
export default OrdersTable
