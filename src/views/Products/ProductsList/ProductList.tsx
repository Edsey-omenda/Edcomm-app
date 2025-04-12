import AdaptableCard from '@/components/shared/AdaptableCard'
import { injectReducer } from '@/store'
import reducer from './store/ProductListSlice'
import ProductCard from './components/ProductCard'
import TopSection from './components/ProductSearch'
import ProductListTools from './components/ProductListTools'

injectReducer('productList', reducer)

const ProductsList = () => {

    return (
        <>
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-2 lg:mb-0">Products</h3>
                <ProductListTools />
            </div>
            <ProductCard />
        </AdaptableCard>
        </>
    )
}

export default ProductsList
