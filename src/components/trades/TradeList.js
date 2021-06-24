import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { Link, useHistory } from "react-router-dom"
import "./Trades.css"
import { ShirtContext } from "../shirts/ShirtProvider"

export const TradeList = () => {
    const { trades, getTrades } = useContext(TradeContext)
    const { shirts, getShirts } = useContext(ShirtContext)
    
    const [activeTrades, setActiveTrades] = useState([])   

    const [acceptedTrades, setAcceptedTrades] = useState([])    

    const history = useHistory()

    useEffect(() => {
        getTrades()
            .then(() => getShirts())
    }, [])

    useEffect(() =>{
        const theseActiveTrades = trades.filter(trade => trade.accepted === false)
        setActiveTrades(theseActiveTrades)
    }, [trades])
    
    useEffect(() =>{
        const theseAcceptedTrades = trades.filter(trade => trade.accepted === true)
        setAcceptedTrades(theseAcceptedTrades)
    }, [trades])



    return (
        <>
            <h2>Trades</h2>
            <button onClick={
                () => history.push("/Trades/create")
            }>
                Propose Trade
            </button>
            <div className="trades">
                {
                    activeTrades.map(trade => {
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
            <div className="trades">
                {
                    acceptedTrades.map(trade => {
                        return (
                            <div className="trade">
                                <Link to={`/trades/detail/${trade.id}`} className="trade__link"
                                    key={trade.id}>
                                    <h2> {trade.message}</h2>
                                </Link>
                                <h3>This trade was accepted!</h3>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

