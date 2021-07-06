import React, { useContext, useEffect, useState, SimpleDateTime } from "react"
import { TradeContext } from "./TradeProvider"
import { ShirtContext } from "../shirts/ShirtProvider"
import { UserContext } from "../users/UserProvider"
import "./Trades.css"
import { useParams, useHistory } from "react-router-dom"
// import SimpleDateTime  from 'react-simple-timestamp-to-date'

export const TradeDetail = () => {
    const { trades, getTrades, getTradeById, removeTrade, addTrade, updateTrade } = useContext(TradeContext)
    const { getShirtById, shirts, getShirts, updateShirt } = useContext(ShirtContext)
    const { getUserById, user, getUsers, users } = useContext(UserContext)
    const [trade, setTrade] = useState({
        shirt: {},
        offerShirtId: 0,
        message: "",
        timeAccepted: 0,
        timestamp: 0,
    })

    const [offerer, setOfferer] = useState({})

    const [recipient, setRecipient] = useState({})

    const [offerShirt, setOfferShirt] = useState({})

    const history = useHistory()

    const { tradeId } = useParams();

    useEffect(() => {
        // getTrades()
        // getUsers()
        getTradeById(tradeId)
            .then(thisTrade => setTrade(thisTrade))
            .then(console.log(trade))
        // getShirtById(trade.offerShirtId)
        //     .then(shirtobj => setOfferShirt(shirtobj))
        // .then(getUserById(offerShirt.userId)
        //     .then((userObj) => setOfferer(userObj)))
    }, [])



    // useEffect(() => {
    //     getTradeById(tradeId)
    //         .then(thisTrade => setTrade(thisTrade))
    // }, [trade])

    useEffect(() => {
        console.log(trade)
        const offerShirtId = parseInt(trade.offerShirtId)
        getShirtById(offerShirtId)
            .then(shirtobj => setOfferShirt(shirtobj))
    }, [trade])

    useEffect(() => {
        getUserById(offerShirt.userId)
            .then(userObj => setOfferer(userObj))
            .then(console.log(offerShirt))
    }, [offerShirt])

    useEffect(() => {
        getUserById(trade.shirt.userId)
            .then(otherUserObj => setRecipient(otherUserObj))
            .then(console.log(offerer))
            .then(console.log(recipient))
    }, [offerer])

    // useEffect(() => {
    //     getUserById(offerShirt.userId)
    //     .then((userObj) => setOfferer(userObj))
    // }, [trade.accepted])

    const handleRemoveTrade = () => {
        removeTrade(trade.id)
            .then(() => {
                history.push("/")
            })
    }

    const handleAcceptTrade = () => {
        const copyOfTradeState = { ...trade }
        copyOfTradeState.timeAccepted = Date.now()
        updateTrade(copyOfTradeState)
            .then(() => {
                const copyOfShirtState = { ...trade.shirt }
                copyOfShirtState.active = false
                updateShirt(copyOfShirtState)
            })
            .then(() => {
                const copyOfOfferShirtState = { ...offerShirt }
                copyOfOfferShirtState.active = false
                updateShirt(copyOfOfferShirtState)
            })
            .then(() => {
                history.push("/")
            })
    }

    // const contactInfo = () => {
    //     const user1 = users.find(user => user.id === offerShirt.userId)
    //     const user2 = users.find(user => user.id === trade.shirt.userId)
    //     // console.log(user1, user2)
    //     return (`yo ${user1.firstName}`)
    //     // return (`
    //     // The trade was offered on ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(trade.timestamp)} by ${user1.firstName}, who can be reached at ${user1.email}, and accepted on on ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(trade.timestamp)} by ${user2.firstName}, who can be reached at ${user2.email}.`
    //     // )
    // }

    return (
        <section className="trade">
            <h3>Would you like to trade your {trade.shirt.title} shirt for my {offerShirt.title} shirt?</h3>
            <div className="trade__images">
                <img src={trade.shirt.imageURL} alt="recipient's t-shirt" className="trade_photo receiver_shirt" />
                <img src={offerShirt.imageURL} alt="sender's t-shirt" className="trade_photo sender_shirt" />
            </div>
            <div className="message_time">
            <h3 className="trade__message">{trade.message}</h3>
            <div className="trade__time">Time Sent: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(trade.timestamp)}
            </div>
            </div>
            <div>
                {
                    trade.timeAccepted
                        ? <div>
                            Time Accepted: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(trade.timestamp)}
                            <div className="users_section">
                                <div className="offerer_info user_info">
                                    <h5>Offered by:</h5>
                                    <div className="user_card">
                                        {offerer.firstName} {offerer.lastName}
                                        <br />
                                        {offerer.email}
                                        <br />
                                        {offerer.address}
                                        <br />
                                        {offerer.city}, {offerer.state} {offerer.zip}
                                    </div>
                                </div>
                                <div className="recipient_info user_info">
                                    <h5>Accepted by: </h5>
                                    <div className="user_card">
                                        {recipient.firstName} {recipient.lastName}
                                        <br />
                                        {recipient.email}
                                        <br />
                                        {recipient.address}
                                        <br />
                                        {recipient.city}, {recipient.state} {recipient.zip}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="buttons">
                            <div className="btn trade__delete__btn">
                                {
                                    offerShirt.userId === parseInt(localStorage.getItem("shirtshare_user")) || trade.shirt.userId === parseInt(localStorage.getItem("shirtshare_user"))
                                        ? <button className="btn trade__delete__btn " onClick={handleRemoveTrade}>Delete Offer</button>
                                        : null
                                }
                            </div>
                            <div className="btn accept__offer__btn">
                                {
                                    trade.shirt.userId === parseInt(localStorage.getItem("shirtshare_user")) && trade.shirt.active && offerShirt.active
                                        ? <button className="btn trade__accept__btn" onClick={handleAcceptTrade}>Accept Offer</button>
                                        : null
                                }
                            </div>

                        </div>
                }
            </div>
        </section>
    )
}
