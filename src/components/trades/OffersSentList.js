import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { Link, useHistory } from "react-router-dom"
import "./Trades.css"
import { ShirtContext, getShirtById } from "../shirts/ShirtProvider"
import { UserContext } from "../users/UserProvider"



export const OfferSentList = () => {
    const { trades, getTrades } = useContext(TradeContext)
    const { shirts, getShirts } = useContext(ShirtContext)
    const { getUserById, user } = useContext(UserContext)

    const [userSentOffers, setUserSentOffers] = useState([])
    const [currentUserShirts, setCurrentUserShirts] = useState([])


    const history = useHistory()

    const findOffersSent = () => {
        const myOffers = []
        trades.map((trade) => {
            currentUserShirts.map((shirt) => {
                if (trade.offerShirtId === shirt.id) {
                    myOffers.push(trade)
                }
            })
        })
        return myOffers
    }


    useEffect(() => {
        getTrades()
            .then(() => getShirts())
    },[])

    useEffect(() => {
        const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
        getUserById(currentUserId)
            .then(() => setCurrentUserShirts(user.shirts))
            .then(() => findOffersSent())
            .then((offerArray) => setUserSentOffers(offerArray))
    }, [shirts])

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
                    userSentOffers.map((trade) => {
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