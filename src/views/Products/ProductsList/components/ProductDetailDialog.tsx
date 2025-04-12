import Dialog from '@/components/ui/Dialog';
import {
    toggleProductDetailsDialog,
    useAppDispatch,
    useAppSelector,
    setSelectedProduct
} from '../store';
import { FaStar } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { FiCheck, FiMinus, FiPackage, FiPlus } from 'react-icons/fi';
import { Key, useEffect, useState } from 'react';
import toast from '@/components/ui/toast';
import { Notification } from '@/components/ui/Notification';
import { useTranslation } from 'react-i18next';
import Tooltip from '@/components/ui/Tooltip';
import classNames from 'classnames';



const ProductDetailDialog: React.FC = () => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch();

    const [selectedColor, setSelectedColor] = useState<string | null>(null)

    const { productDetailDialog, selectedProduct } = useAppSelector((state) => state.productList);
    
    const onDialogClose = () => {
        dispatch(setSelectedProduct(null));
        dispatch(toggleProductDetailsDialog(false));
    };

    const handleIncrease = () => {
        console.log("Cart Quantity increased!")
    } 

    const handleDecrease = () => {
        console.log("Cart Quantity decreased!")
    } 

    const handleRemove = () => {
        console.log("Remove from cart!")
        onDialogClose();
    }

    const handleUpdate = (event: React.MouseEvent) => {
        console.log("Cart Updated!")
    };

    const handleAddToCart = () => {
        console.log("Add to cart!")
    };



    return (
        <div>
            <Dialog
                isOpen={productDetailDialog}
                width={1200}
                height={600}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto p-6">
                        <div className="flex flex-col sm:flex-row">
                            <div className='w-full sm:w-1/2 flex items-center justify-center'>
                                {selectedProduct?.imageUrl ? (
                                    <img src={selectedProduct.imageUrl} 
                                    alt={selectedProduct.name} 
                                    className='w-full h-full' 
                                    style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '10px' }}  />
                                ) : (
                                    <FiPackage className='text-gray-500' size={150} />
                                )}
                            </div>
                            <div className='w-full sm:w-1/2 pl-0 sm:pl-6 flex flex-col justify-between'>
                                <div>
                                    <h4 className="text-3xl font-semibold mb-2">{selectedProduct?.name}</h4>
                                    <div className="flex items-center mb-4">
                                        <p className="text-xl text-gray-600 mr-4 mt-4">{selectedProduct?.stock}</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xl "> ${selectedProduct?.price ?? 0}</p>
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        {/* Sizes */}
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">Available Sizes:</p>
                                            <p className="text-base text-gray-800">{selectedProduct?.size?.join(', ')}</p>
                                        </div>
                                        {/* Colors */}
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">Available Colors:</p>
                                            <div className="flex items-center space-x-2">
                                                {selectedProduct?.color?.map((clr, index) => {
                                                    const colorName = clr.toLowerCase()
                                                    const isSelected = selectedColor === colorName

                                                    return (
                                                        <Tooltip key={index} title={clr}>
                                                            <div
                                                                className={classNames(
                                                                    'w-9 h-9 rounded-full border border-gray-300 relative cursor-pointer hover:scale-105 transition transform duration-150 ease-in-out',
                                                                    { 'ring-2 ring-blue-500': isSelected }
                                                                )}
                                                                style={{ backgroundColor: clr.toLowerCase() }}
                                                                onClick={() => setSelectedColor(clr.toLowerCase())}
                                                            >
                                                                {isSelected && (
                                                                    <FiCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500" />
                                                                )}
                                                            </div>
                                                        </Tooltip>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                        <Button
                                            variant="solid"
                                            size="md"
                                            onClick={(event) => handleAddToCart()}
                                        >
                                            <span>{t('common.add') as string}</span>
                                        </Button>
                                        <div className="flex items-center">
                                            <Button
                                                icon={<FiMinus />}
                                                style={{ borderRadius: 0 }}
                                                variant="twoTone"
                                                size="md"
                                                onClick={handleDecrease}
                                            />
                                            <Button
                                                icon={<FiPlus />}
                                                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                variant="twoTone"
                                                size="md"
                                                onClick={handleIncrease}
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className="items-center text-xl mt-4">
                            <h4>{t('products.details') as string}</h4>
                            <p>{selectedProduct?.description}</p>
                        </div>
                    </div>
                        <div className="flex justify-end p-6 border-t border-gray-300">
                            <Button
                                size="md"
                                onClick={onDialogClose}
                                className="mr-2"
                            >
                                <span>{t('common.cancel') as string}</span>
                            </Button>
                            <Button
                                variant="solid"
                                size="md"
                                onClick={handleUpdate}
                            >
                                <span>{t('common.update') as string}</span>
                            </Button>
                        </div>
                </div>
            </Dialog>
        </div>
    );
}
export default ProductDetailDialog;