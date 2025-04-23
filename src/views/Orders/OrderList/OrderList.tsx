import AdaptableCard from '@/components/shared/AdaptableCard'
import OrdersTable from './components/OrdersTable'
import OrdersTableTools from './components/OrdersTableTools'
import OrderDeleteConfirmation from './components/OrderDeleteConfirmation';
import { injectReducer, useAppDispatch } from '@/store';
import reducer, { getOrderStatuses } from './store';

injectReducer('ordersList', reducer)

const OrderList = () => {

    const dispatch = useAppDispatch()

    dispatch(getOrderStatuses())

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <OrdersTableTools />
            </div>
            <OrdersTable />
        </AdaptableCard>
    )
}

export default OrderList
