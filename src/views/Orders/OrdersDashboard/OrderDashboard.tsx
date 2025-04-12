import AdaptableCard from '@/components/shared/AdaptableCard'

//injectReducer('ordersHistory', reducer)

const OrderDashboard = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Orders Dasboard</h3>
            </div>
        </AdaptableCard>
    )
}

export default OrderDashboard
