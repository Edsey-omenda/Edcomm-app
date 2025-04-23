import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { getProducts, setProductsData, toggleProductDetailsDialog, setSelectedProduct, removeProduct, deleteProduct } from '../store/ProductListSlice'
import { FiPackage } from 'react-icons/fi';
import Pagination from '@/components/ui/Pagination';
import cloneDeep from 'lodash/cloneDeep';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import toast from '@/components/ui/toast';
import Notification from '@/components/ui/Notification'
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store';
import { Product } from '../../types';
import ProductDetailDialog from './ProductDetailDialog';
import { useNavigate } from 'react-router-dom';
import { ADMIN } from '@/constants/roles.constant';
import { HiPencil, HiTrash } from 'react-icons/hi';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { addToCart } from '@/store/slices/cart/cartSlice';

const CategoryIcon = ({ imageUrl }: { imageUrl: string }) => {
    return imageUrl ? (
        <img 
            src={imageUrl} 
            alt="Product Image" 
            style={{ objectFit: 'fill', borderRadius: '10px'}} 
            className="w-full h-full"
        />
    ) : (
        <FiPackage style={{ width: '50%', height: '50%' }}/>
    );
};

type Option = {
    value: number
    label: string
} 

const options: Option[] = [
    { value: 10, label: '10 / page' },
    { value: 25, label: '25 / page' },
    { value: 50, label: '50 / page' },
    { value: 100, label: '100 / page' },
]

const ProductCard = () => {
    
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [dialogOpen, setDialogOpen] = useState(false)

    const roles = useAppSelector((state) => state.auth.user.roles)
        
    const isAdmin = roles?.includes(ADMIN)

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.productList?.productsData ?? {}
    );              
    
    const productsData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const data = useAppSelector((state) => state?.productList?.productsList)
    console.log("Product Data:", data ?? 'No data yet');
    const selectedProduct = useAppSelector(
        (state) => state.productList.selectedProduct
    )

    useEffect(() => {
        fetchData()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageIndex, sort])

    const fetchData = () => {
        dispatch(getProducts({
            pageIndex: productsData.pageIndex ?? 1,
            pageSize: productsData.pageSize ?? 10,
            filterQuery: productsData.query || '',
            filterOn: 'Name',
            isAscending: true,
        }))
    }

    const onPaginationChange = (page: number) => {
        const newCatalogueData = cloneDeep(productsData)
        newCatalogueData.pageIndex = page
        dispatch(setProductsData(newCatalogueData))
    }

    const onSelectChange = (value: number) => {
        const newCatalogueData = cloneDeep(productsData)
        newCatalogueData.pageSize = Number(value)
        newCatalogueData.pageIndex = 1
        dispatch(setProductsData(newCatalogueData))
    }

    const onProductClick = (product: Product) => {
        dispatch(setSelectedProduct(product))
        dispatch(toggleProductDetailsDialog(true))
    }

    const handleAddToCart  = (product: Product, event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(addToCart({
            productId: product.productId,
            productName: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
        }))
    }

    const handleEditClick = (product: Product, event: React.MouseEvent) => {
        event.stopPropagation();
        navigate(`/products/product-edit/${product.productId}`)
    }

    const onDeleteDialogClose = () => {
        setDialogOpen(false)
    }

    const onDeletePressed = async (product: Product, event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(setSelectedProduct(product))
        setDialogOpen(true)
        console.log("Product to be deleted:", product);
    }

    const handleDeleteClick  = async () => {
        setDialogOpen(false)
        if (selectedProduct) {
            const response = await removeProduct({ id: selectedProduct.productId })
            if (response) {
                dispatch(deleteProduct(selectedProduct.productId))
                toast.push(
                    <Notification
                        title={t('common.deleted') as string}
                        type="success"
                        customIcon={
                            <HiTrash className="text-2xl text-emerald-500" />
                        }
                    >
                        {selectedProduct.name}
                        {t('common.deleteSuccess') as string}
                    </Notification>
                )
            } else {
                toast.push(
                    <Notification title={'Failed'} type="danger">
                        {selectedProduct.name}
                        {t('common.deleteFailed') as string}
                    </Notification>
                )
            }
        }
    }


    return (
        <>
        <div>
            <div className="grid lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                    {data?.map((product) => (
                        <Card
                            key={product.productId}
                            clickable
                            onClick={() => onProductClick(product)}
                        >
                            <div className="relative flex h-48 w-auto items-center justify-center sm:h-64">
                                <span className="sr-only">{t('catalogue.productImage') as string}</span>
                                <CategoryIcon imageUrl={product.imageUrl} />
                            </div>
                                <h3 className="mb-2 mt-4 text-sm font-semibold truncate text-heading">
                                    {product.name}
                                </h3>
                                <p className="text-xs text-muted">{product.stock}</p>
                                <div className="relative flex items-center justify-between mt-7 min-h-6 md:mt-8">
                                    <div className="relative">
                                        <span className="text-sm font-semibold text-accent md:text-base">
                                            ${product.price}
                                        </span>
                                    </div>
                                    <div className="relative flex items-center justify-between gap-1">
                                    {isAdmin && (
                                        <>
                                            <Button
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={(e) => 
                                                    handleEditClick(product, e)
                                                }
                                                //icon={<HiPencil size={18} />}
                                                title="Edit Product"
                                                size='sm'
                                            >
                                               <span>{t('common.edit') as string}</span>
                                            </Button>
                                            <Button
                                                className="text-red-500"
                                                onClick={(e) => 
                                                    onDeletePressed(product, e)
                                                }
                                                //icon={<HiTrash size={18} />}
                                                title="Delete Product"
                                                size='sm'
                                            >
                                            <span>{t('common.delete') as string}</span>
                                            </Button>
                                        </>
                                    )}
                                   <Button
                                        variant="solid" size="sm"
                                        onClick={(event) => handleAddToCart (product, event)}
                                    >
                                        <span>{t('common.add') as string}</span>
                                   </Button>
                                   </div>
                                </div>
                        </Card>
                    ))}
                    <ProductDetailDialog />
            </div>
            <div className="flex justify-between mt-4 items-center">
                    <Pagination 
                        pageSize={productsData.pageSize as number}
                        currentPage={productsData.pageIndex as number}
                        total={productsData.total as number}
                        onChange={onPaginationChange}
                    />
                    <div style={{ minWidth: 120 }}>
                        <Select
                            isSearchable={false}
                            defaultValue={options.find(option => option.value === productsData.pageSize)}
                            options={options}
                            onChange={(selectedOption) => {
                                if (selectedOption) {
                                    onSelectChange(selectedOption.value);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title={t('common.delete') as string}
                confirmButtonColor="red-600"
                onClose={onDeleteDialogClose}
                onRequestClose={onDeleteDialogClose}
                onCancel={onDeleteDialogClose}
                onConfirm={handleDeleteClick}
            >
                <p>
                    {t('common.deleteConfirmation') as string}
                    {selectedProduct?.name} ?
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ProductCard

