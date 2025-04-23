import { useEffect, useState } from 'react'
import Loading from '@/components/shared/Loading'
import ContentTable from './ContentTable'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { HiMail, HiPhone } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import Button from '@/components/ui/Button'
import { useAppSelector } from '../store'
import EDCommLogo from '@/components/template/EDCommLogo'

const OrderDetailsContent = () => {
    const { textTheme } = useThemeClass()

    const location = useLocation()

    const [loading, setLoading] = useState(false)

    const mode = useAppSelector((state) => state.theme.mode)
    const orderDetails = useAppSelector((state) => state.orderDetail.data.orderDetail)

    const user = useAppSelector((state) => state.auth.user)

    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Loading loading={loading}>
            {!isEmpty(orderDetails) && (
                <>
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
                        <div>
                            <EDCommLogo className="mb-3" mode={mode} />
                            <address className="not-italic">
                                <div>
                                <br />
                                    <h5>Shipping Address.</h5>
                                    <br />
                                    100 Main ST
                                    <br />                                    
                                    PO Box 1022
                                    Seattle WA 98104
                                    <br />
                                    United States of America
                                    <br />
                                </div>
                            </address>
                        </div>
                        <div className="my-4">
                            <div className="mb-2">
                                <h4>Order #</h4>
                                <span>
                                    Date:{' '}
                                        {new Date(orderDetails.orderDate).toLocaleDateString()}
                                </span>
                            </div>
                            <h6>{"Contact"}</h6>
                            <div className="mt-4 flex">
                                <HiMail
                                    className={`text-xl ${textTheme}`}
                                />
                                <div className="ltr:ml-3 rtl:mr-3">
                                    {user.email}
                                </div>
                            </div>
                            <div className="mt-4 flex">
                                <HiPhone className={`text-xl ${textTheme}`} />
                                <div className="ltr:ml-3 rtl:mr-3">
                                    {user.fullName}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContentTable
                        items={orderDetails?.items}
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
