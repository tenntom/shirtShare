import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { Link, useHistory } from "react-router-dom"
import "./Trades.css"
import { ShirtContext, getShirtById } from "../shirts/ShirtProvider"

export const OffersReceivedList = () => {
    const { trades, getTrades } = useContext(TradeContext)
    const { shirts, getShirts, getShirtById } = useContext(ShirtContext)

    const [currentOffers, setCurrentOffers] = useState([])

    const history = useHistory()
    const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))


    useEffect(() => {
        getTrades()
        // .then(() => getShirts())
    }, [])

    useEffect(() => {
        const  theseOffers = trades.filter(trade => trade.shirt.userId === currentUserId)
        setCurrentOffers(theseOffers)
        console.log(currentUserId)
        console.log(currentOffers)
    }, [trades])
    
    

    //const currentUserOffers = trades.filter(trade => trade.shirt.userId === currentUserId)

    // const offerShirtsReceived = () => {
    //     for (trade of trades) {
    //         for (shirt of currentUserShirts) {
    //             if (trade.userId = shirt.id) {
    //                 return shirt
    //             }
    //         }
    //     }
    // }



    // const tradesForYou = trades.map((trade)=> {
    //     for (shirt of currentUserShirts) {
    //         if(trade.shirtId===currentUserShirt.id) {
    //             return trade
    //         }
    //     }
    // })

    // const shirtsToTrade = trades.map(trade => getShirtById(trade.shirtId))

    // const currentUserShirts = shirtsToTrade.filter(shirt => shirt.userId=== currentUserId)

    // const getTradesForYou = () => {
    //     const tradesForYou = []
    //     for (trade of trades) {
    //         for (shirt of currentUserShirts) {
    //             if (trade.shirtId === shirt.id) {
    //                 tradesForYou.push(trade)
    //             }
    //         }
    //     } return tradesForYou
    // }

    // getTradesForYou()



    
    // const shirtsForYou = trades.filter(trade => trade.shirt.userId === currentUserId)

    // const tradesForYou = trades.filter(trade => trade.shirt.userId === currentUserId)

    // const tradesForYou = trades.filter((trade) => {
    //     for (shirt of shirts) {
    //         if (shirt.userId=== currentUserId) {
    //             return shirt
    //         }
    //         trade.shirtId === shirt.id
    //     }

    //     shirts.filter(shirt => shirt.id===trade.shirtId)
        
    //     trade.shirtId === shirts.find(shirt=> shirt.id === currentUserId)
    // })


    //     const offerShirt = shirts.find(shirt => shirt.id === trade.shirtId)
    //     if(offerShirt.userId === currentUserId)
    //     }
    // }
    
    // trade.shirt.userId === currentUserId)

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

