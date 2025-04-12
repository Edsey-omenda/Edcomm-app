import AdaptableCard from '@/components/shared/AdaptableCard'

//injectReducer('ordersHistory', reducer)

const NewOrder = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Please Create an Order</h3>
            </div>
        </AdaptableCard>
    )
}

export default NewOrder
