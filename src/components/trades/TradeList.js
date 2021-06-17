import React, { useContext, useEffect } from "react"
import { TradeContext } from "./TradeProvider"
import { Link, useHistory } from "react-router-dom"
import "./Trades.css"
import { ShirtContext } from "../shirts/ShirtProvider"

export const TradeList = () => {
    const { trades, getTrades } = useContext(TradeContext)
    const { shirts, getShirts } = useContext(ShirtContext)

    const history = useHistory()

    useEffect(() => {
        getTrades()
        .then(() => getShirts())
    }, [])

    // useEffect(() => {
    //     getShirts()
    // }, [])



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
                    trades.map(trade => {
                        // const offerShirt = shirts.find(shirt => shirt.id === trade.offerShirtId)
                        return (
                            <div className="trade">
                                <Link to={`/trades/detail/${trade.id}`} className="trade__link"
                                    key={trade.id}>
                                    <h2> {trade.message}</h2>
                                </Link>
                                {/* <h3>How about my {offerShirt.title} shirt for your {trade.shirt.title} shirt?</h3> */}
                                <h3>How about my shirt for your {trade.shirt.title} shirt?</h3>
                            </div>
                        )
                    })
                })
                }
            </div>
        </>
    )
}

