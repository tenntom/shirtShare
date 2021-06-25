import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { Link, useHistory } from "react-router-dom"
import "./Trades.css"
import { ShirtContext } from "../shirts/ShirtProvider"

export const OffersReceivedList = () => {
    const { trades, getTrades } = useContext(TradeContext)

    const [acceptedOffers, setAcceptedOffers] = useState([])
    const [openOffers, setOpenOffers] = useState([])

    const history = useHistory()
    const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))

    //Run this on page load.

    useEffect(() => {
        getTrades()
    }, [])

    //Run again each time trades are updated.

    useEffect(() => {
        const  theseOffers = trades.filter(trade => trade.shirt.userId === currentUserId)
        const theseAcceptedOffers = theseOffers.filter(trade => trade.timeAccepted !== 0)
        const theseOpenOffers = theseOffers.filter(trade => trade.timeAccepted === 0)
        setAcceptedOffers(theseAcceptedOffers)
        setOpenOffers(theseOpenOffers)
    }, [trades])
    
    //first return the open offers, then the accepted offers. 
    return (
        <>
            <h2>Offers Received</h2>
            <button className="create-shirt-btn"onClick={
                () => history.push("./create")
            }>Add Shirt
            </button>

            <button className="propose-trade-btn" onClick={
                () => history.push("/trades/create")
            }>
                Propose Trade
            </button>
            <div className="trades-proposed">
                <h3>Offers You Received:</h3>
                {
                    openOffers.map(trade => {
                        return (
                            <div className="trade">
                                <Link to={`/trades/detail/${trade.id}`} className="trade__link"
                                    key={trade.id}>
                                    <h2> {trade.message}</h2>
                                </Link>
                                <h3>How about my shirt for your {trade.shirt.title} shirt?</h3>
                            </div>
                        )
                    })
                }
            </div>
            <div className="trades-accepted">
                <h3>Offers You Accepted:</h3>
                {
                    acceptedOffers.map(trade => {
                        return (
                            <div className="trade">
                                <Link to={`/trades/detail/${trade.id}`} className="trade__link"
                                    key={trade.id}>
                                    <h2> {trade.message}</h2>
                                </Link>
                                <h3>How about my shirt for your {trade.shirt.title} shirt?</h3>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

