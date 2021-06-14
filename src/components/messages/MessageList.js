import React, { useContext, useEffect } from "react"
import { MessageContext } from "./MessageProvider"
import { Link, useHistory } from "react-router-dom"
import "./Messages.css"

export const MessageList = () => {
    const { messages, getMessages } = useContext(MessageContext)

    const history = useHistory()

    useEffect(() => {
        getMessages()
    }, [])

    return (
        <>
            <h2>Messages</h2>
            <button onClick={
                () => history.push("/messages/create")
            }>
                Add Message
            </button>
            <div className="messages">
                {
                    messages.map(message => <Link to={`/messages/detail/${message.id}`} className="message"
                        key={message.id}>
                            {message.text}
                        {/* <h3>{message.senderShirt.title} for your {message.recipientShirt.title}?</h3> */}
                    </Link>
                    )
                }
            </div>
        </>
    )
}
