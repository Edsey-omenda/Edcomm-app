import type { ThemeConfiguratorProps } from '@/components/template/ThemeConfigurator'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import { decreaseQuantity, increaseQuantity, removeFromCart, selectTotalItems, useAppDispatch, useAppSelector } from '@/store'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { HiArrowLeft, HiOutlineTrash, HiTrash } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'

export type CartContentProps = ThemeConfiguratorProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CartDrawerContent = ({ callBackClose }: CartContentProps) => {

    const navigate  = useNavigate()
    const dispatch = useAppDispatch()

    const cartItems = useAppSelector((state) => state.cart.items)
    const totalItems = useAppSelector(selectTotalItems)

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    
    const handleViewCart = () => {
        if (callBackClose) {
            callBackClose()
        }
        navigate('/cart/your-cart')
    }

    const handleCheckout = () => {
        if (callBackClose) {
            callBackClose()
        }
        navigate('/products/products-list')
    }

    return (
        <div className="flex flex-col p-4 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.productId} className="flex items-center justify-between gap-4">
                            <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{item.productName}</p>
                                <div className="text-gray-500 text-sm mt-1">
                                    <NumericFormat value={(item.price * item.quantity)} displayType="text" prefix="$" />
                                </div>
                                <div className="flex items-center mt-2 space-x-2">
                                    <Tooltip title="Decrease quantity" placement="top">
                                        <Button
                                            icon={<FiMinus />}
                                            style={{ borderRadius: 0 }}
                                            variant="twoTone"
                                            size="sm"
                                            onClick={() => dispatch(decreaseQuantity(item.productId))}
                                        />
                                    </Tooltip>
                                    <span className="text-sm">{item.quantity}</span>
                                    <Tooltip title="Increase quantity" placement="top">
                                        <Button
                                            icon={<FiPlus />}
                                            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                            variant="twoTone"
                                            size="sm"
                                            onClick={() => dispatch(increaseQuantity(item.productId))}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <Tooltip title="Remove item from cart" placement="top">
                                    <span
                                        className="cursor-pointer p-2 hover:text-red-500"
                                        onClick={() => dispatch(removeFromCart(item.productId))}
                                    >
                                        <HiOutlineTrash size={14}/>
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                    {/* Bottom Total + Checkout + Continue Shopping */}
                <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold mb-3">
                        <span>Total</span>
                        <NumericFormat value={totalAmount} displayType="text" prefix="$ " />
                    </div>

                    <div className="flex justify-between gap-2">
                        <Button
                            className="flex-1 text-sm font-semibold"
                            variant="plain"
                            onClick={handleCheckout}
                            icon={<HiArrowLeft />}
                        >
                            Continue Shopping
                        </Button>
                        <Button
                            className="flex-1 text-sm font-medium"
                            variant="solid"
                            onClick={handleViewCart}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
        </div>
    )
}

export default CartDrawerContent
