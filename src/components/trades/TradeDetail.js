import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { ShirtContext } from "../shirts/ShirtProvider"
import "./Trades.css"
import { useParams, useHistory } from "react-router-dom"

export const TradeDetail = () => {
    const { trades, getTrades, getTradeById, removeTrade } = useContext(TradeContext)
    const { getShirtById, shirts, getShirts } = useContext(ShirtContext)
    const [trade, setTrade] = useState({
        shirt: {},
        offerShirtId: 0,
        message: "",
        accepted: false,
        timestamp: 0
    })

    const [offerShirt, setOfferShirt] = useState({})
    
    const history = useHistory()

    useEffect(() => {
        getTrades()
        getShirts()
    }, [])

    const { tradeId } = useParams();


    useEffect(() => {
        getTradeById(tradeId)
        .then(thisTrade => setTrade(thisTrade))
    },[tradeId])

    useEffect(() => {
        getShirtById(trade.offerShirtId)
        .then(shirtobj => setOfferShirt(shirtobj))
    },[trade]
    )

    const handleRemoveTrade = () => {
        removeTrade(trade.id)
        .then(() => {
            history.push("/trades")
        })
    }

    return (
        <section className="trade">
            <h3>Would you like to trade my {offerShirt.title} shirt for your {trade.shirt.title} shirt? </h3>
            <div className="trade__images">
            <img src={trade.shirt.imageURL} alt="recipient's t-shirt" className="trade_photo receiver_shirt" />
            <img src={offerShirt.imageURL} alt="sender's t-shirt" className="trade_photo sender_shirt" />
            </div>
            <h3 className="trade__message">{trade.message}</h3>
            <div className="trade__accepted">{trade.accepted}</div>
            <div className="trade__time">Time Sent: {trade.timestamp}</div>
            <button className="btn trade__delete__btn " onClick={handleRemoveTrade}>Delete Trade Offer</button>
        </section>
    )
}
