import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { Link, useHistory } from "react-router-dom"
import "./Trades.css"
import { ShirtContext } from "../shirts/ShirtProvider"
import { UserContext } from "../users/UserProvider"



export const OfferSentList = () => {
    const { trades, getTrades } = useContext(TradeContext)
    const { shirts, getShirts } = useContext(ShirtContext)
    const { getUserById, user, setUser } = useContext(UserContext)

    // const [currentUserShirts, setCurrentUserShirts] = useState([])
    // set array for shirts that were posted by the current user

    const [openSentOffers, setOpenSentOffers] = useState([])
    // set array for open offers/ trades

    const [acceptedSentOffers, setAcceptedSentOffers] = useState([])
    //set array for accepted offers/trades

    const history = useHistory()

    useEffect(() => {
        getTrades()
            .then(() => getShirts())
    }, [])

    //using one of these at page load, another anytime shirts updates. Not sure why this works only with shirts. I don't know why this second useEffect only works property with shirts. It seems it runs twice.

    useEffect(() => {
        const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
        getUserById(currentUserId)
            .then(() => {
                const currentUserShirts = user.shirts
                const theseOffers = []
                trades.map((trade) => {
                    currentUserShirts.map((shirt) => {
                        if (trade.offerShirtId === shirt.id) {
                            theseOffers.push(trade)
                        }
                    })
                })
                const theseOpenSentOffers = theseOffers.filter(trade => trade.timeAccepted === 0)
                const theseAcceptedSentOffers = theseOffers.filter(trade => trade.timeAccepted > 0)
                setOpenSentOffers(theseOpenSentOffers)
                setAcceptedSentOffers(theseAcceptedSentOffers)
            })
    }, [shirts])

    //first return the open offers, then the accepted offers. 

    return (
        <>
            <h2>Offers Sent</h2>
            <button className="create-shirt-btn"onClick={
                () => history.push("./create")
            }>Add Shirt
            </button>

            <button className="propose-trade-btn" onClick={
                () => history.push("/trades/create")
            }>
                Propose Trade
            </button>
            <div className="open-offers-sent">
                <h3>Offers You Sent:</h3>
                {
                    openSentOffers.map((trade) => {
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
            <div className="accepted-offers-sent">
                <h3>Offers Accepted:</h3>
                {
                    acceptedSentOffers.map((trade) => {
                        return (
                            <div className="trade">
                                <Link to={`/trades/detail/${trade.id}`} className="trade__link"
                                    key={trade.id}>
                                    <h2> {trade.message}</h2>
                                </Link>
                                <h3>You traded your shirt for a {trade.shirt.title}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}