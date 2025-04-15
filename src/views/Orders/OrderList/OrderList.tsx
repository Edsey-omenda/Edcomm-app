import AdaptableCard from '@/components/shared/AdaptableCard'
import OrdersTable from './components/OrdersTable'
import OrdersTableTools from './components/OrdersTableTools'
import OrderDeleteConfirmation from './components/OrderDeleteConfirmation';
import { injectReducer } from '@/store';
import reducer from './store';

injectReducer('ordersList', reducer)

const OrderList = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                {/* <OrdersTableTools /> */}
            </div>
            <OrdersTable />
            {/* <OrderDeleteConfirmation /> */}
        </AdaptableCard>
    )
}

export default OrderList
