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

    // const [offerer, setOfferer] = useState({})

    // const [recipient, setRecipient] = useState({})

    const [offerShirt, setOfferShirt] = useState({})

    const history = useHistory()

    const { tradeId } = useParams();

    useEffect(() => {
        getTrades()
        getUsers()
        getTradeById(tradeId)
            .then(thisTrade => setTrade(thisTrade))
        getShirtById(trade.offerShirtId)
            .then(shirtobj => setOfferShirt(shirtobj))
            // .then(getUserById(offerShirt.userId)
            //     .then((userObj) => setOfferer(userObj)))
    }, [])



    // useEffect(() => {
    //     getTradeById(tradeId)
    //         .then(thisTrade => setTrade(thisTrade))
    // }, [trade])

    useEffect(() => {
        getShirtById(trade.offerShirtId)
            .then(shirtobj => setOfferShirt(shirtobj))
    }, [trade])

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

    const contactInfo = () => {
        const user1 = users.find((user) => user.id === offerShirt.userId)
        const user2 = users.find((user) => user.id === trade.shirt.userId)
        console.log(user1, user2)
        // return (`
        // The trade was offered on ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(trade.timestamp)} by ${user1.firstName}, who can be reached at ${user1.email}, and accepted on on ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(trade.timestamp)} by ${user2.firstName}, who can be reached at ${user2.email}`
        // )
    }

    return (
        <section className="trade">
            <h3>Would you like to trade your {trade.shirt.title} shirt for my {offerShirt.title} shirt?</h3>
            <div className="trade__images">
                <img src={trade.shirt.imageURL} alt="recipient's t-shirt" className="trade_photo receiver_shirt" />
                <img src={offerShirt.imageURL} alt="sender's t-shirt" className="trade_photo sender_shirt" />
            </div>
            <h3 className="trade__message">{trade.message}</h3>
            <div className="trade__time">Time Sent: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(trade.timestamp)}
            </div>
            <div>
                {
                    trade.timeAccepted
                        ? <div>
                            {contactInfo()}
                            </div>
                        :
                        <div className="buttons">
                            <div className="btn trade__delete__btn">
                                {
                                    offerShirt.userId === parseInt(localStorage.getItem("shirtshare_user")) || trade.shirt.userId === parseInt(localStorage.getItem("shirtshare_user"))
                                        ? <button className="btn trade__delete__btn " onClick={handleRemoveTrade}>Delete Trade Offer</button>
                                        : <p> </p>
                                }
                            </div>
                            <div className="accept-offer">
                                {
                                    trade.shirt.userId === parseInt(localStorage.getItem("shirtshare_user")) && trade.shirt.active && offerShirt.active
                                        ? <button className="btn trade__accept__btn" onClick={handleAcceptTrade}>Accept Trade</button>
                                        : <p> </p>
                                }
                            </div>

                        </div>
                }
            </div>
        </section>
    )
}
