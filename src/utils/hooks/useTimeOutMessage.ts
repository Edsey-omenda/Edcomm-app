import { useEffect, useState } from 'react'

export type MessageType = 'success' | 'danger' | null

export interface MessageState {
    text: string
    type: MessageType
}

function useTimeOutMessage(
    interval = 3000
): [MessageState, React.Dispatch<React.SetStateAction<MessageState>>] {
    const [message, setMessage] = useState<MessageState>({ text: '', type: null })

    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => setMessage({ text: '', type: null }), interval)
            return () => {
                clearTimeout(timeout)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message.text])

    return [message, setMessage]
}

export default useTimeOutMessage
