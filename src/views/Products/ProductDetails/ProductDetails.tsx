import { injectReducer } from '@/store'
import reducer, { useAppSelector } from './store'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import isEmpty from 'lodash/isEmpty'

injectReducer('productDetails', reducer)

const ProductDetails = () => {

    const { productDetail, loading } = useAppSelector((state) => state.productDetails)

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(productDetail) && (
                    <>
                        {/* <ProductForm
                            type="edit"
                            initialData={productData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        /> */}
                    </>
                )}
            </Loading>
            {!loading && isEmpty(productDetail) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No product found!</h3>
                </div>
            )}
        </>
    )
}

export default ProductDetails
