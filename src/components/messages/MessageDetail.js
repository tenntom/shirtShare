import React, { useContext, useEffect, useState } from "react"
import { MessageContext } from "./MessageProvider"
import "./Message.css"
import { useParams } from "react-router-dom"

export const MessageDetail = () => {
    const { messages } = useContext(MessageContext)
    const [ message, setMessage ] = useState({
        senderShirt: {},
        recipientShirt: {},
        text:"",
        read: false,
        accepted: false,
        timestamp: 0
    }),

    const { messageId } = useParams();
    //problem with this const - check tomorrow

    useEffect(() => {
        getMessages
    },[])


    useEffect(() => {
        const thisMessage = messages.find(a => a.id === messageId)
        setMessage(thisMessage)
    }, [messageId])

    return (
    <section className="message">
        <h3>Would you like to trade my {message.senderShirt.title} for your {message.recipientShirt.title}? </h3>
        <img src= {message.senderShirt.imageURL} alt="sender's t-shirt" className="message_photo"/>
        <h3 className="message__text">{ message.text }</h3>
        <h3>From {message.senderShirt.firstName} </h3>
        {
            //Look  up the checkbox options. Maybe put link to other shirts from sender above. Or a link back to the shirt.
        }
        <div className="message__accepted">{ message.accepted }</div>
        <div className="message__location">Time Received: { message.timestamp }</div>
    </section>
    )
}
