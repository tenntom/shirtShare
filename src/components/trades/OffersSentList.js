import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { Link, useHistory } from "react-router-dom"
import "./Trades.css"
import { ShirtContext } from "../shirts/ShirtProvider"
import { UserContext } from "../users/UserProvider"



export const OfferSentList = () => {
    const { trades, getTrades } = useContext(TradeContext)
    const { shirts, getShirts } = useContext(ShirtContext)
    const { getUserById, user } = useContext(UserContext)

    const [currentUserShirts, setCurrentUserShirts] = useState([])
    
    const [openSentOffers, setOpenSentOffers] = useState([])
    const [acceptedSentOffers, setAcceptedSentOffers] = useState([])

    const history = useHistory()

    const findOpenOffersSent = () => {
        const myOpenOffers = []
        trades.map((trade) => {
            currentUserShirts.map((shirt) => {
                if (trade.offerShirtId === shirt.id && trade.timeAccepted === 0) {
                    myOpenOffers.push(trade)
                }
            })
        })
        return myOpenOffers
    }
    const findAcceptedOffersSent = () => {
        const myAcceptedOffers = []
        trades.map((trade) => {
            currentUserShirts.map((shirt) => {
                if (trade.offerShirtId === shirt.id && trade.timeAccepted > 0) {
                    myAcceptedOffers.push(trade)
                }
            })
        })
        return myAcceptedOffers
    }


    useEffect(() => {
        getTrades()
            .then(() => getShirts())
            .then(() => {
                const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
                getUserById(currentUserId)
                    .then(() => setCurrentUserShirts(user.shirts))
                    .then(() => findOpenOffersSent())
                    .then((offerArray) => setOpenSentOffers(offerArray))
                    .then(() => findAcceptedOffersSent())
                    .then((otherOfferArray) => setAcceptedSentOffers(otherOfferArray))
            }
            )
    },[])

    useEffect(() => {
        const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
        getUserById(currentUserId)
            .then(() => setCurrentUserShirts(user.shirts))
            .then(() => findOpenOffersSent())
            .then((offerArray) => setOpenSentOffers(offerArray))
            .then(() => findAcceptedOffersSent())
            .then((otherOfferArray) => setAcceptedSentOffers(otherOfferArray))
    }, [shirts])

    return (
        <>
            <h2>Trades</h2>
            <button onClick={
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