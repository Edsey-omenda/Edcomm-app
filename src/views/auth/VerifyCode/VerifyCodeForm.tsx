import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import { apiForgotPassword, apiVerifyToken } from '@/services/AuthService'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import useThemeClass from '@/utils/hooks/useThemeClass'

interface VerifyCodeFormProps extends CommonProps {
    email?: string
    timestamp? : Date
    signInUrl?: string
    resetPasswordUrl? : string
}

type VerifyCodeFormSchema = {
    code: string
}

const validationSchema = Yup.object().shape({
    code: Yup.string().required('Please enter the verification code'),
})

const COUNTDOWN_DURATION = 300 // 300 seconds

const VerifyCodeForm = (props: VerifyCodeFormProps) => {

    const navigate = useNavigate()
    const { textTheme } = useThemeClass()
    const { email = '', timestamp = new Date(),  className, signInUrl = '/sign-in', resetPasswordUrl = '/reset-password' } = props
    const [message, setMessage] = useTimeOutMessage(10000)
    const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION);
    const [timerOn, setTimerOn] = useState(true);


    useEffect(() => {
        if (timerOn && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [timeLeft, timerOn])
    
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    function getDifferenceInSeconds(date: Date) {
        const currentDate = new Date();
        const difference = date.getTime() - currentDate.getTime();
        return difference > 0 ? Math.floor(difference / 1000) : 0
    }


    const onSendMail = async (
        values: VerifyCodeFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const { code } = values
        try {
            const resp = await apiVerifyToken({ token: code.trim(), email})
            setSubmitting(false)
            if (resp.success) { 
                navigate(resetPasswordUrl , {state:{ tokenKey: code.trim(), email: email }})
            } else {
                setMessage({ text: resp.message, type: 'danger' })
            }
        } catch (errors) {
            setSubmitting(false)
            setMessage({ text: 'Something went wrong! Please try again', type: 'danger' })
        }
    }

    const resendCode = async () => {
        try {
            const resp = await apiForgotPassword({ email: email})
            if (resp.success) { 
                setTimeLeft(COUNTDOWN_DURATION)
                setTimerOn(true)
            } else {
                setMessage({ text: resp.message, type: 'danger' })
            }
        } catch (errors) {
            setMessage({ text: 'Something went wrong! Please try again', type: 'danger' })
        }
    }
    
    const isValidMessage = typeof message?.text === 'string' && message?.type

    return (
        <div className={className}>
            <div className="mb-6">
                <h3 className="mb-1">Verify Code</h3>
                <p>
                    Please enter the verification code sent to your email address.
                </p>
            </div>
            {isValidMessage && (
                <Alert showIcon className="mb-4" type={message.type as 'danger' | 'success'}>
                    {message.text}
                </Alert>
            )}
            <Formik
                initialValues={{
                    email: email, code: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => onSendMail(values, setSubmitting)}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            
                            <FormItem
                                invalid={errors.code && touched.code}
                                errorMessage={errors.code}
                            >
                                <Field
                                    type="text"
                                    autoComplete="one-time-code"
                                    name="code"
                                    placeholder="Code"
                                    component={Input}
                                />
                            </FormItem>

                            <div className="flex justify-between mb-6">
                                <p>
                                    Time Remaining {formatTime(timeLeft)}
                                </p>
                                <span onClick={resendCode} style={{ cursor: 'pointer' }} className={classNames(textTheme, 'hover:underline')}>
                                    Resend Code
                                </span>
                            </div>

                            <Button
                                block
                                disabled={timeLeft < 1}
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                Verify
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Back to </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default VerifyCodeForm
