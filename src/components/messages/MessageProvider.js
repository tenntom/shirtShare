import React, {useState, createContext} from "react"

export const MessageContext = createContext()

export const MessageProvider = (props) => {
    const [messages, setMessages] = useState([])

    const getMessages = () => {
        return fetch("http://localhost:7777/messages")
        .then(res=> res.json())
        .then(setMessages)
    }

    const addMessage= messageObj => {
        return fetch("http://localhost:7777/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
        .then(response => response.json)
    }

    const getMessageById = (msgId) => {
        return fetch(`http://localhost:7077/messages/${msgId}?_expand=shirt`)
        .then(res=> res.json())
    }

    return (
        <MessageContext.Provider value={{
            messages, getMessages, addMessage, getMessageById
        }}>
        {props.children}
        </MessageContext.Provider>
    )
}