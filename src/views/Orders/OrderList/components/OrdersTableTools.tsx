import Button from '@/components/ui/Button'
import { HiDownload, HiOutlineFilter } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '../store';
import { Parser } from '@json2csv/plainjs';
import OrderTableSearch from './OrderTableSearch';


const OrdersTableTools = () => {
    const dateFormat = 'MMM DD, YYYY'
    
    const dispatch = useAppDispatch()

    const roles = useAppSelector((state) => state.auth.user.roles)
    const isAdmin = roles?.includes('Admin')

    const data = useAppSelector((state) =>
        isAdmin ? state.ordersList.data.adminOrders : state.ordersList.data.myOrders
    )


    const handleExport = () => {
        try {
            const columnsToExport = [
                'status',
                'orderDate',
                'totalAmount',
                'CustomerName',
                'items',
            ];

            const dataToExport = data.map((order: any) => {
                const filteredData: any = {};
                columnsToExport.forEach((col) => {
                    filteredData[col] = order[col];
                });
                return filteredData;
            });

            //console.log("dataToExport", dataToExport)
            const parser = new Parser({ fields: columnsToExport });
            const csv = parser.parse(dataToExport);
            console.log(csv);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'order-List.csv';
            link.click();
          } catch (err) {
            console.error(err);
          }
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            </div>
                <Button size="sm" icon={<HiDownload />} onClick={handleExport}>
                    Export
                </Button>
                <OrderTableSearch />
        </div>
    )
}

export default OrdersTableTools
