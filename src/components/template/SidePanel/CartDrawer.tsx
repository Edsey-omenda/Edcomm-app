import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import CartContent, { CartContentProps } from './CartDrawerContent'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { setPanelExpand, useAppSelector, useAppDispatch, selectTotalItems } from '@/store'
import type { CommonProps } from '@/@types/common'

type CartProps = CartContentProps & CommonProps

const _CartDrawer = (props: CartProps) => {
    const dispatch = useAppDispatch()

    const { className, ...rest } = props

    const panelExpand = useAppSelector((state) => state.theme.panelExpand)

    const direction = useAppSelector((state) => state.theme.direction)

    const totalItems = useAppSelector(selectTotalItems)

    const openPanel = () => {
        dispatch(setPanelExpand(true))
    }

    const closePanel = () => {
        dispatch(setPanelExpand(false))
        const bodyClassList = document.body.classList
        if (bodyClassList.contains('drawer-lock-scroll')) {
            bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
        }
    }

    return (
        <>
            <div
                className={classNames('text-2xl', className)}
                onClick={openPanel}
                {...rest}
            >
                <div className="relative">
                    <HiOutlineShoppingCart className="text-2xl" />

                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                            {totalItems}
                        </span>
                    )}
                </div>
            </div>
            <Drawer
                title={`Your Cart - ${totalItems} Item${totalItems > 1 ? 's' : ''}`}
                isOpen={panelExpand}
                placement={direction === 'rtl' ? 'left' : 'right'}
                width={425}
                onClose={closePanel}
                onRequestClose={closePanel}
            >
                <CartContent callBackClose={closePanel} />
            </Drawer>
        </>
    )
}

const CartDrawer = withHeaderItem(_CartDrawer)

export default CartDrawer
