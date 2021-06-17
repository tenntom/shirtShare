import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { ShirtContext } from "../shirts/ShirtProvider"
import "./Trades.css"
import { useParams } from "react-router-dom"

export const TradeDetail = () => {
    const { trades, getTrades, getTradeById } = useContext(TradeContext)
    const { getShirtById, shirts, getShirts } = useContext(ShirtContext)
    const [trade, setTrade] = useState({
        shirt: {},
        offerShirtId: 0,
        text: "",
        read: false,
        accepted: false,
        timestamp: 0
    })

    const [offerShirt, setOfferShirt] = useState({})



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

    return (
        <section className="Trade">
            <h3>Would you like to trade my {offerShirt.title} shirt for your {trade.shirt.title} shirt? </h3>
            <img src={trade.shirt.imageURL} alt="sender's t-shirt" className="trade_photo" />
            <h3 className="Trade__message">{trade.message}</h3>
            <div className="Trade__accepted">{trade.accepted}</div>
            <div className="Trade__location">Time Received: {trade.timestamp}</div>
        </section>
    )
}
