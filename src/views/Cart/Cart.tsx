import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart, useAppDispatch, useAppSelector } from '@/store'
import { useNavigate } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import Button from '@/components/ui/Button'
import { HiArrowLeft, HiOutlineTrash, HiTrash } from 'react-icons/hi'
import { FiMinus, FiPlus } from 'react-icons/fi'
import Tooltip from '@/components/ui/Tooltip'
import { apiCreateOrder } from '@/services/OrderService'
import { toast } from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Spinner } from '@/components/ui/Spinner'


const Cart = () => {

    const cart = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [placingOrder, setPlacingOrder] = useState(false)

    const DELIVERY_FEE = 300
    const FREE_DELIVERY_THRESHOLD = 10000
    const hasFreeDelivery = cart.totalPrice >= FREE_DELIVERY_THRESHOLD

    const handleCheckout = async() => {
      setPlacingOrder(true)
      try {
        const payload = cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        const response = await apiCreateOrder(payload);
        console.log('Order placed:', response.data);
        setTimeout(() => {
          toast.push(
              <Notification title="Order Success" type="success">
                  Order placed successfully!
              </Notification>,
              { placement: 'top-center' }
          )

          dispatch(clearCart())
          navigate('/checkout/payment')
          setPlacingOrder(false)
      }, 5000)
    } catch (error) {
        console.error('Order placement failed:', error);
        toast.push(
          <Notification
              title={"Order Creation Failed"}
              type="success"
              duration={2500}
          >
              Failed to Create Order
          </Notification>,
          {
              placement: 'top-center',
          }
        )
      } finally {
          setPlacingOrder(false)
      }
    }

    const handleContinueShopping = () => {
        navigate('/products/products-list')
    }

    const tax = cart.totalPrice * 0.10
    const discount = cart.totalPrice * 0.05
    const deliveryFee = hasFreeDelivery ? 0 : DELIVERY_FEE
    const grandTotal = cart.totalPrice + tax + deliveryFee - discount

    return (
      <>
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>

            {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map(item => (
                            <div key={item.productId} className="flex justify-between items-center border p-4 rounded-md">
                                <div className="flex items-center space-x-4">
                                    <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 object-cover rounded" />
                                    <div>
                                        <h4 className="font-semibold">{item.productName}</h4>
                                        <p className="text-gray-600">
                                            <NumericFormat value={item.price} displayType="text" prefix="$" /> each
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Tooltip title="Decrease quantity" placement="top">
                                      <Button
                                          icon={<FiMinus />}
                                          style={{ borderRadius: 0 }}
                                          variant="twoTone"
                                          size="sm"
                                          onClick={() => dispatch(decreaseQuantity(item.productId))}
                                      />
                                    </Tooltip>
                                    <span>{item.quantity}</span>
                                    <Tooltip title="Increase quantity" placement="top">
                                      <Button
                                          icon={<FiPlus />}
                                          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                          variant="twoTone"
                                          size="sm"
                                          onClick={() => dispatch(increaseQuantity(item.productId))}
                                      />
                                    </Tooltip>
                                    <p className="ml-4 font-semibold">
                                        <NumericFormat value={item.price * item.quantity} displayType="text" prefix="$" />
                                    </p>
                                    <Tooltip title="Remove item from cart" placement="top">
                                      <span
                                          className="cursor-pointer p-2 hover:text-red-500"
                                          onClick={() => dispatch(removeFromCart(item.productId))}
                                      >
                                          <HiOutlineTrash size={18} />
                                      </span>
                                    </Tooltip>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="border p-4 rounded-md shadow-md space-y-4">
                      <h3 className="text-lg font-bold">Summary</h3>

                      <p className="flex justify-between">
                          <span>Total Items:</span>
                          <span>{cart.totalQuantity}</span>
                      </p>

                      <p className="flex justify-between">
                          <span>Subtotal:</span>
                          <NumericFormat value={cart.totalPrice.toFixed(2)} displayType="text" prefix="$" />
                      </p>

                      <p className="flex justify-between">
                          <span>Tax (10%):</span>
                          <NumericFormat value={(cart.totalPrice * 0.10).toFixed(2)} displayType="text" prefix="$" />
                      </p>

                      {hasFreeDelivery ? (
                          <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-2 rounded">
                              🎉 Congrats! You've qualified for Free Delivery.
                          </div>
                      ) : (
                          <p className="flex justify-between">
                              <span>Delivery Fee:</span>
                              <NumericFormat value={deliveryFee} displayType="text" prefix="$" />
                          </p>
                      )}

                      <p className="flex justify-between">
                          <span>Discount:</span>
                          <NumericFormat value={(cart.totalPrice * 0.05).toFixed(2)} displayType="text" prefix="$" />
                      </p>

                      <hr />

                      <p className="flex justify-between font-semibold text-lg">
                          <span>Grand Total:</span>
                          <NumericFormat
                              value={grandTotal.toFixed(2)}
                              displayType="text"
                              prefix="$"
                          />
                      </p>
                      <div className="flex justify-between pt-2">
                        <Tooltip title="Continue Shopping" placement="top">
                            <Button size="sm" variant="plain" onClick={handleContinueShopping}>
                                <HiArrowLeft className="inline-block mr-1" />
                                Continue Shopping
                            </Button>
                          </Tooltip>
                          <Tooltip title="Checkout" placement="top">
                            <Button size="sm" variant="solid" onClick={handleCheckout}>
                                Checkout
                            </Button>
                          </Tooltip>
                      </div>
                  </div>
                </div>
            )}
        </div>
        <Dialog
          isOpen={placingOrder}
          onClose={() => setPlacingOrder(false)}
          onRequestClose={() => setPlacingOrder(false)}
        >
          <div className="flex items-center">
          <h5 className="mb-4">Dialog Title</h5>
            <Spinner className="mr-4" color="green-500"  size="3.25rem" />
            <p className="font-semibold">Placing Your Order...</p>
         </div>
        </Dialog>
        </>
    )
}

export default Cart
