import Button from '@/components/ui/Button'
import { HiDownload, HiOutlineFilter } from 'react-icons/hi'
import OrderTableSearch from './OrderTableSearch'
import DatePickerRange from '@/components/ui/DatePicker/DatePickerRange';
import dayjs from 'dayjs'
import { getOrdersHistory, setEndDate, setStartDate, useAppDispatch, useAppSelector } from '../store';
import { Parser } from '@json2csv/plainjs';


const OrdersTableTools = () => {
    const dateFormat = 'MMM DD, YYYY'
    
    const dispatch = useAppDispatch()

    const { additionalInfo } = useAppSelector((state) => state.auth.user)
    const { orderHistory } = useAppSelector((state) => state.ordersHistory.data);

    const start = useAppSelector((state) => (
        state.ordersHistory.data.startDate
    ))

    const end = useAppSelector((state) => (
        state.ordersHistory.data.endDate
    ))


    const handleDateChange = (value: [Date | null, Date | null]) => {
        const startDateUnix = value[0] ? dayjs(value[0]).unix() : 0;
        const endDateUnix = value[1] ? dayjs(value[1]).unix() : 0;

        dispatch(setStartDate(startDateUnix))
        dispatch(setEndDate(endDateUnix))

        // dispatch(getOrdersHistory({
        //     start: startDateUnix !== 0 ? dayjs.unix(startDateUnix).toDate() : undefined,
        //     end: endDateUnix !== 0 ? dayjs.unix(endDateUnix).toDate() : undefined,
        //     offset: 0,
        //     siteId: siteId,
        // }));
    }

    const handleExport = () => {
        try {
            const columnsToExport = [
                'OrderNumber',
                'CreatedDate',
                'Site',
                'Type',
                'Status',
                'ItemTotal',
                'QtyTotal',
                'PriceTotal',
            ];

            const dataToExport = orderHistory.map((order: any) => {
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
            link.download = 'order-history.csv';
            link.click();
          } catch (err) {
            console.error(err);
          }
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <DatePickerRange
                    value={[
                        dayjs.unix(start).toDate(),
                        dayjs.unix(end).toDate(),
                    ]}
                    inputFormat={dateFormat}
                    size="sm"
                    onChange={handleDateChange}
                />
            </div>
                <Button size="sm" icon={<HiDownload />} onClick={handleExport}>
                    Export
                </Button>
            {/* <OrderTableSearch /> */}
        </div>
    )
}

export default OrdersTableTools
