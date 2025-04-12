import Container from '@/components/shared/Container'
import OrderDetailsContent from './components/OrderDetailsContent'
import Card from '@/components/ui/Card'

const OrderDetails = () => {

    return (
        <Container className="h-full">
            <Card className="h-full" bodyClass="h-full">
                {/* <OrderDetailsContent  /> */}
                <h1>Order Details</h1>
            </Card>
        </Container>
    )
}

export default OrderDetails
