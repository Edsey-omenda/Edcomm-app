import Container from '@/components/shared/Container'
import OrderDetailsContent from './components/OrderDetailsContent'
import Card from '@/components/ui/Card'
import { injectReducer, useAppDispatch } from '@/store'
import reducer, { getOrderDetail } from './store'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { GetOrderByIdRequest } from '../types'

injectReducer('orderDetail', reducer)

const OrderDetails = () => {

     const { id } = useParams()
    const dispatch = useAppDispatch()

     useEffect(() => {
            if (id) {
                fetchData({ orderId: id })
            }
        }, [id])
    
        const fetchData = (id: GetOrderByIdRequest) => {
            dispatch(getOrderDetail(id))
        }

    return (
        <Container className="h-full">
            <Card className="h-full" bodyClass="h-full">
                <OrderDetailsContent  />
                {/* <h1>Order Details</h1> */}
            </Card>
        </Container>
    )
}

export default OrderDetails
