import { defineStore } from 'pinia'
import { useGlobalState } from './globalState'

interface Message {
    title: String,
    message: String,
    priority: String,
    icon: String,
    _id: String,
    timeout: number,
    timeoutID?: number
}

export const useMessages = defineStore('messages', () => {
    const globalState = useGlobalState()

    const addMessage = (message: Message) => {
        globalState.messages.push(message)
        _resumeTimeout(message._id, message.timeout)
    }

    const delMessage = (messageID: String) => {
        globalState.messages = globalState.messages.filter(e => e._id !== messageID)
    }

    const _resumeTimeout = (messageID: String, timeout: number) => {
        if (timeout > 0) {
            const message: Message = globalState.messages.filter(e => e._id === messageID)[0]
            message.timeoutID = setTimeout(() => {
                globalState.messages = globalState.messages.filter(e => e._id !== messageID)
            }, timeout)
        }
    }

    const _pauseTimeout = (timeoutID: number) => {
        clearTimeout(timeoutID)
    }

    return ({
        addMessage,
        delMessage,
        _pauseTimeout,
        _resumeTimeout
    })
})
