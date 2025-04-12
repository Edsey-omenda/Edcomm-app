import { useCallback, useEffect, useMemo, useRef } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { NumericFormat } from 'react-number-format'
import type {
    DataTableResetHandle,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import { getOrdersHistory, setOrderHistoryData, useAppDispatch, useAppSelector } from '../store'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import Tag from '@/components/ui/Tag'
import { HiOutlineEye } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'


const ActionColumn = ({ row }: { row: any }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/orderlist/${row.Id}`, { state: { CreatedDate: row.CreatedDate } });
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
    const { additionalInfo } = useAppSelector((state) => state.auth.user)

     const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.ordersHistory.data.tableData
    )


    const loading = useAppSelector((state) => state.ordersHistory.data.loading)

    const data = useAppSelector((state) => state.ordersHistory.data.orderHistory)

    const startDate = useAppSelector((state) => state.ordersHistory.data.startDate)

    const endDate = useAppSelector((state) => state.ordersHistory.data.endDate)

    const siteId = additionalInfo?.Data?.Id
    
    
    const fetchData = useCallback(() => {
        
        const start = startDate !== null ? dayjs.unix(startDate).toDate() : undefined;
        const end = endDate !== null ? dayjs.unix(endDate).toDate() : undefined;

        const currentPageIndex = pageIndex ?? 1; 
        const currentPageSize = pageSize ?? 25;

        dispatch(getOrdersHistory({ start, end, siteId, offset: (currentPageIndex - 1) * currentPageSize, limit: currentPageSize }));
        //console.log("orderHistory-data:", data)
        
    }, [dispatch, siteId, startDate, endDate, pageIndex, pageSize]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )


    const getTooltipContent = (row: any) => {
        return (
            <div>
                <p><strong>Order #:</strong> {row.OrderNumber}</p>
                <p><strong>Delivery Date:</strong> {new Date(row.DeliveryDate).toLocaleDateString()}</p>
                <p><strong>Creator:</strong> {row.Creator}</p>
                <p><strong>Contact:</strong> {row.Contact}</p>
                <p><strong>Address 1:</strong> {row.Address1}</p>
                <p><strong>City:</strong> {row.City}</p>
                <p><strong>State:</strong> {row.State}</p>
                <p><strong>Postal Code:</strong> {row.Postcode}</p>
                <p><strong>Wholesaler:</strong> {row.Wholesaler}</p>
                <p><strong>Instructions:</strong> {row.Instructions}</p>
            </div>
        );
    }
    
    const columns: ColumnDef<any>[] = useMemo(
        () => [
            {
                header: 'Order #',
                accessorKey: 'OrderNumber',
                enableSorting: false,
            },
            {
                header: 'Created',
                accessorKey: 'CreatedDate',
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
                header: 'Name',
                accessorKey: 'Site',
                enableSorting: false,
                cell: (props) => {
                    const row = props.row.original;
                    return (
                        <Tooltip title={getTooltipContent(row)}>
                            <span className="cursor-pointer">{row.Site}</span>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Type',
                accessorKey: 'Type',
                enableSorting: false,
            },
            {
                header: 'Status',
                accessorKey: 'Status',
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
                header: 'Items',
                accessorKey: 'ItemTotal',
                enableSorting: false,
            },
            {
                header: 'Quantity',
                accessorKey: 'QtyTotal',
                enableSorting: false,
            },
            {
                header: '$ Total',
                accessorKey: 'PriceTotal',
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
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setOrderHistoryData(newTableData))
        // dispatch(setOrderHistoryData({
        //     ...tableData,
        //     pageIndex: page
        // }));
    };
    
    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setOrderHistoryData(newTableData))
        // dispatch(setOrderHistoryData({
        //     ...tableData,
        //     pageSize: value,
        //     pageIndex: 1
        // }));
    };
    

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
            />
        </>
    )
}

export default OrdersTable
