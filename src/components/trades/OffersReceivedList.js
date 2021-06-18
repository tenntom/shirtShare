import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { Link, useHistory } from "react-router-dom"
import "./Trades.css"
import { ShirtContext } from "../shirts/ShirtProvider"

export const OffersReceivedList = () => {
    const { trades, getTrades } = useContext(TradeContext)
    const { shirts, getShirts, getShirtById } = useContext(ShirtContext)

    const [currentOffers, setCurrentOffers] = useState([])

    const history = useHistory()
    const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))


    useEffect(() => {
        getTrades()
       
    }, [])

    useEffect(() => {
        const  theseOffers = trades.filter(trade => trade.shirt.userId === currentUserId)
        setCurrentOffers(theseOffers)
    }, [trades])
    
    

    
    return (
        <>
            <h2>Trades</h2>
            <button onClick={
                () => history.push("/trades/create")
            }>
                Propose Trade
            </button>
            <div className="trades">
                {
                    currentOffers.map(trade => {
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

