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
    // set array for shirts that were posted by the current user

    const [openSentOffers, setOpenSentOffers] = useState([])
    // set array for open offers/ trades

    const [acceptedSentOffers, setAcceptedSentOffers] = useState([])
    //set array for accepted offers/trades

    const history = useHistory()

    //function to cycle through all trades and all usershirts to find all cases where the offerShirt.Id equals the shirt id and the time Accepted is still 0. I think there may be a more efficient way to do this using filter or something else. 
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

    //same as above but for accepted offers.
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

    //This is my convoluted but generally ok attempt to then sort the accepted and open orders through the fetch process. 

    const sortSentOffers = () => {        
        const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
        getUserById(currentUserId)
        .then(() => setCurrentUserShirts(user.shirts))
        // .then(() => {const userShirts = shirts.filter(shirt => shirt.userId = user.id)
        //     setCurrentUserShirts(userShirts)}
        // )
        .then(() => findOpenOffersSent())
        .then((offerArray) => setOpenSentOffers(offerArray))
        .then(() => findAcceptedOffersSent())
        .then((otherOfferArray) => setAcceptedSentOffers(otherOfferArray))
    }

    //This is a lot of then's in there. There's probably a better way to do this. There is a delay when the page loads and the trade sections are populated.

    useEffect(() => {
        getTrades()
            .then(() => getShirts())
            .then(() => sortSentOffers())
    },[])

    //using one of these at page load, another anytime shirts updates. Not sure why this works only with shirts. 

    useEffect(() => {
        sortSentOffers()
    }, [shirts])

    //first return the open offers, then the accepted offers. 

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