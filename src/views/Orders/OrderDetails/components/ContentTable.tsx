import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import { OrderItemInfo } from '@/@types/auth'

type ContentTableProps = {
    items?: OrderItemInfo[]
}

type TFootRowsProps = {
    label: string
    value?: number
}

const { Tr, Th, Td, THead, TBody, TFoot } = Table

const TFootRows = ({ label, value }: TFootRowsProps) => {
    return (
        <Tr>
            <Td className="!border-t-0" colSpan={3}></Td>
            <Td className="font-semibold !border-t-0">{label}</Td>
            <Td className="!py-5 !border-t-0">
                <PriceAmount amount={value} />
            </Td>
        </Tr>
    )
}

const ProductColumn = ({ row }: { row: OrderItemInfo }) => {
    return (
        <div className="flex items-center">
            <div className="ml-4">
                <h6 className="mb-2">{row.ProductName}</h6>
                <p>{row.ProductCode}</p>
            </div>
        </div>
    );
};

const PriceAmount = ({ amount = 0 }: { amount?: number }) => {
    return (
        <NumericFormat
            displayType="text"
            value={(Math.round(amount * 100) / 100).toFixed(2)}
            prefix={'$'}
            thousandSeparator={true}
        />
    )
}

const calculateTotalCost = (items: OrderItemInfo[]): number => {
    return items.reduce((total, item) => {
        const itemTotalPrice = (item.UnitPrice) * item.Qty;
        return total + itemTotalPrice;
    }, 0);
};

const calculateTotalTax = (items: OrderItemInfo[]): number => {
    return items.reduce((sum, item) => {
        return sum + item.TaxAmount
    }, 0)
}


const columnHelper = createColumnHelper<OrderItemInfo>()

const columns = [
    columnHelper.accessor('ProductName', {
        header: 'Product',
        cell: (props) => {
            const row = props.row.original
            return <ProductColumn row={row} />
        },
    }),
    columnHelper.accessor('UnitPrice', {
        header: 'Price',
        cell: (props) => {
            const row = props.row.original
            return <PriceAmount amount={row.UnitPrice} />
        },
    }),
    columnHelper.accessor('Qty', {
        header: 'Quantity',
    }),
    columnHelper.accessor('TaxAmount', {
        header: 'Tax',
    }),
    columnHelper.accessor('TotalExTax', {
        header: 'Total',
        cell: (props) => {
            const row = props.row.original
            const totalPrice = ((row.UnitPrice  * row.Qty) + row.TaxAmount)
            return <PriceAmount amount={totalPrice} />
        },
    }),
]

const ContentTable = ({ items = [] }: ContentTableProps) => {
    const table = useReactTable({
        data: items,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const totalExTax = calculateTotalCost(items);
    
    const totalTax = calculateTotalTax(items);

    const totalIncTax = totalExTax + totalTax

    return (
        <Table>
            <THead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <Th key={header.id} colSpan={header.colSpan}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </Th>
                            )
                        })}
                    </Tr>
                ))}
            </THead>
            <TBody>
                {table.getRowModel().rows.map((row) => {
                    return (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                )
                            })}
                        </Tr>
                    )
                })}
            </TBody>
            <TFoot>
                <TFootRows label="Subtotal" value={totalExTax} />
                <TFootRows label="Tax" value={totalTax} />
                <Tr>
                    <Td className="!border-t-0" colSpan={3}></Td>
                    <Td className="font-semibold text-base">Total</Td>
                    <Td className="font-semibold text-base !py-5">
                        <PriceAmount amount={totalIncTax} />
                    </Td>
                </Tr>
            </TFoot>
        </Table>
    )
}

export default ContentTable
