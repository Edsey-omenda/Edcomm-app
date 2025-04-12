import AdaptableCard from '@/components/shared/AdaptableCard'
import NewProductForm from './forms/NewProductForm'

const NewProduct = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="items-center justify-between mb-4">
                <NewProductForm />
            </div>
        </AdaptableCard>
    )
}

export default NewProduct
