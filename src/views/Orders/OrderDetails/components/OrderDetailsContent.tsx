import { useEffect, useState } from 'react'
import Loading from '@/components/shared/Loading'
import ContentTable from './ContentTable'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { HiMail, HiPhone } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useAppSelector } from '@/store'
import { OrderHeaderInfo } from '@/@types/auth'
import { apiGetOrderDetails } from '@/services/OrderService'
import { format, parseISO } from 'date-fns';
import Button from '@/components/ui/Button'

const OrderDetailsContent = () => {
    const { textTheme } = useThemeClass()

    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Partial<OrderHeaderInfo>>({})
    const [error, setError] = useState<string | null>(null);

    const mode = useAppSelector((state) => state.theme.mode)

    const  CreatedDate = location.state.CreatedDate

    const formatDate = (dateString: string) => {
        if (!dateString) {
            return 'Invalid date';
        }
        const date = parseISO(dateString);
        return format(date, 'EEEE, dd MMMM, yyyy');
    };
    
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async () => {
        const id = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        
        if (id) {
            setLoading(true)
            try {
                const response = await apiGetOrderDetails(id)
                if(response.Success) {
                    setData(response.Data)
                    //console.log("Details-Data:", response)
                
                } else {
                    setError(response.Message);
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        }
    }


    return (
        <Loading loading={loading}>
            {!isEmpty(data) && (
                <>
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
                        <div>
                            {/* <Logo className="mb-3" mode={mode} /> */}
                            <address className="not-italic">
                                <div>
                                <br />
                                    <h5>Shipping Address.</h5>
                                    <br />
                                    <span>{data.Address1}</span>
                                    <br />
                                    <span>{data.City}, {data.State} {data.Postcode}</span>
                                    <br />
                                    <span title="Phone">Phone:</span>
                                    <span>{data.ContactPhone}</span>
                                </div>
                            </address>
                        </div>
                        <div className="my-4">
                            <div className="mb-2">
                                <h4>Order #{data.OrderNumber}</h4>
                                <span>
                                    Date:{' '}
                                        {formatDate(CreatedDate)}
                                </span>
                            </div>
                            <h6>{data.Contact}</h6>
                            <div className="mt-4 flex">
                                <HiMail
                                    className={`text-xl ${textTheme}`}
                                />
                                <div className="ltr:ml-3 rtl:mr-3">
                                    {data.ContactEmail}
                                </div>
                            </div>
                            <div className="mt-4 flex">
                                <HiPhone className={`text-xl ${textTheme}`} />
                                <div className="ltr:ml-3 rtl:mr-3">
                                    {data.ContactPhone}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContentTable
                        items={data?.Items}
                    />
                    <div className="print:hidden mt-6 flex items-center justify-end">
                        <Button variant="solid" onClick={() => window.print()}>
                            Print
                        </Button>
                    </div>
                </>
            )}
        </Loading>
    )
}

export default OrderDetailsContent
