import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { ShirtContext } from "../shirts/ShirtProvider"
import "./Trades.css"
import { useParams, useHistory } from "react-router-dom"

export const TradeDetail = () => {
    const { trades, getTrades, getTradeById, removeTrade, addTrade } = useContext(TradeContext)
    const { getShirtById, shirts, getShirts } = useContext(ShirtContext)
    const [trade, setTrade] = useState({
        shirt: {},
        offerShirtId: 0,
        message: "",
        accepted: false,
        timestamp: 0,
    })

    const [offerShirt, setOfferShirt] = useState({})

    // const [offerSender, setOfferSender]
    // const [offerReceiver, setOfferReceiver]

    const history = useHistory()

    useEffect(() => {
        getTrades()
        getShirts()
    }, [])

    const { tradeId } = useParams();


    useEffect(() => {
        getTradeById(tradeId)
            .then(thisTrade => setTrade(thisTrade))
    }, [tradeId])

    useEffect(() => {
        getShirtById(trade.offerShirtId)
            .then(shirtobj => setOfferShirt(shirtobj))
    }, [trade]
    )

    const handleRemoveTrade = () => {
        removeTrade(trade.id)
            .then(() => {
                history.push("/trades")
            })
    }


    return (
        <section className="trade">
            <h3>Would you like to trade your {trade.shirt.title} shirt for my {offerShirt.title} shirt?</h3>
            <div className="trade__images">
                <img src={trade.shirt.imageURL} alt="recipient's t-shirt" className="trade_photo receiver_shirt" />
                <img src={offerShirt.imageURL} alt="sender's t-shirt" className="trade_photo sender_shirt" />
            </div>
            <h3 className="trade__message">{trade.message}</h3>
            <div className="trade__accepted">{trade.accepted}</div>
            <div className="trade__time">Time Sent: {trade.timestamp}</div>
            <div className="buttons">
            <div className="btn trade__delete__btn">
                {
                    offerShirt.id === parseInt(localStorage.getItem("shirtshare_user"))|| trade.shirt.userId === parseInt(localStorage.getItem("shirtshare_user"))
                    ? <button className="btn trade__delete__btn " onClick={handleRemoveTrade}>Delete Trade Offer</button>
                    :<p> </p>
                }
            </div>
            <div className="accept-offer">
                {
                    trade.shirt.userId === parseInt(localStorage.getItem("shirtshare_user"))
                        ? <button className="btn trade__accept__btn" onClick=
                            {(clickEvent) => {
                                const copyOfTradeState = { ...trade }
                                copyOfTradeState.accepted = true
                                setTrade(copyOfTradeState)
                                // addTrade(trade)
                                // this needs to be an editTrade functon. See Kennels to figure out. 
                            }
                            }>Accept Trade</button>
                        : <p> </p>
                }
            </div>
            </div>
        </section>
    )
}
