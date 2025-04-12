import AdaptableCard from '@/components/shared/AdaptableCard'

//injectReducer('ordersHistory', reducer)

const ProductsDashboard = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Products Dashboard</h3>
            </div>
        </AdaptableCard>
    )
}

export default ProductsDashboard
