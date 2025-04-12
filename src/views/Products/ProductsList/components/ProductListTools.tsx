import Button from '@/components/ui/Button'
import { HiPlusCircle } from 'react-icons/hi'
import ProductFilter from './ProductFilter'
import { Link } from 'react-router-dom'
import ProductSearch from './ProductSearch'
import { ADMIN } from '@/constants/roles.constant'
import { useAppSelector } from '../store'

const ProductListTools = () => {

    const roles = useAppSelector((state) => state.auth.user.roles)
    
    const isAdmin = roles?.includes(ADMIN)


    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <ProductSearch />
            <ProductFilter />
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/products/product-new"
            >
                {isAdmin && (
                    <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                        Add Product
                    </Button>
                )}
            </Link>
        </div>
    )
}

export default ProductListTools
