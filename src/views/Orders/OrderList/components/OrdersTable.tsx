import { useCallback, useEffect, useMemo, useRef } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { NumericFormat } from 'react-number-format'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import { 
    getAdminOrders, 
    getMyOrders, 
    setAdminTableData, 
    setMyTableData, 
    useAppDispatch, 
    useAppSelector 
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineEye } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import { Order } from '../../types'

export const mapStatusToStyle = (
    statuses: { name: string; color: string }[]
): Record<
    string,
    {
        label: string
        dotStyle: React.CSSProperties
        textStyle: React.CSSProperties
    }
> => {
    return statuses.reduce((acc, status) => {
        acc[status.name] = {
            label: status.name,
            dotStyle: { backgroundColor: status.color },
            textStyle: { color: status.color },
        }
        return acc
    }, {} as Record<string, { label: string; dotStyle: React.CSSProperties; textStyle: React.CSSProperties }>)
}

const ActionColumn = ({ row }: { row: Order }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/orders/order-details/${row.orderId}`)
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
    const orderStatuses = useAppSelector((state) => state.ordersList.data.orderStatuses)

    const statusStyleMap = useMemo(() => mapStatusToStyle(orderStatuses), [orderStatuses])

    
    const fetchData = useCallback(() => {
        const { pageIndex, pageSize, query } = initialTableData

        const params = {
            pageIndex: pageIndex ?? 1,
            pageSize: pageSize ?? 25,
            filterQuery: query || '',
            filterOn: 'CustomerName',
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
                    const date = new Date(row.orderDate)
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
                cell: (props) => {
                    const { status } = props.row.original
            
                    const style = statusStyleMap[status] ?? {
                        label: status,
                        dotClass: 'bg-gray-400',
                        textClass: 'text-gray-600',
                    }
            
                    return (
                        <div className="flex items-center">
                            <Badge style={style.dotStyle} />
                            <span
                                className="ml-2 rtl:mr-2 capitalize font-semibold"
                                style={style.textStyle}
                            >
                                {style.label}
                            </span>
                        </div>
                    )
                },
            },            
            {
                header: '$ Total',
                accessorKey: 'totalAmount',
                enableSorting: false,
                cell: (props) => {
                    const { totalAmount } = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={(Math.round(totalAmount * 100) / 100).toFixed(2)}
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
