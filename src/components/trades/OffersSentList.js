import React, { useContext, useEffect, useState } from "react"
import { TradeContext } from "./TradeProvider"
import { Link, useHistory } from "react-router-dom"
import "./Trades.css"
import { ShirtContext, getShirtById } from "../shirts/ShirtProvider"
import { UserContext } from "../users/UserProvider"



export const OfferSentList = () => {
    const { trades, getTrades, setTrades } = useContext(TradeContext)
    const { shirts, getShirts, getShirtById } = useContext(ShirtContext)
    const { getUserById, user } = useContext(UserContext)

    const [userSentOffers, setUserSentOffers] = useState([])
    const [currentUserShirts, setCurrentUserShirts] = useState([])

    const myOffers = []

    const history = useHistory()
    // const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
    // const currentUser = getUserById(currentUserId)
    // const currentUserShirts = currentUser.shirts

    const findOffersSent = () => {
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
        // .then(() => getUserById(currentUserId))
        // .then(() => console.log(user))
    }, [])

    useEffect(() => {
        const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
        getUserById(currentUserId)
            .then(() => setCurrentUserShirts(user.shirts))
            .then(() => findOffersSent())
            .then((offerArray) => setUserSentOffers(offerArray))
            .then(() => console.log(userSentOffers))
    }, [shirts])




    // useEffect(() => {
    //     const theseShirts = user.shirts
    //     setCurrentUserShirts(theseShirts)
    // },[user])

    // useEffect(() => {
    //     const theseShirts = trades.map((trade) => {
    //         user.shirts.find(shirt => shirt.id === trade.offerShirtId)
    //         // for (shirt of user.shirts) {
    //         //     if (trade.offerShirtId === shirt.id) {
    //         //         return trade
    //         //     }
    //         // }
    //     })
    //     // setTrades(theseShirts)
    //     setUserSentOffers(theseShirts)
    //  }, [user])






    // for (shirt of currentUserShirts) {
    //     if (trade.offerShirtId === shirt.id) {
    //         return trade
    //     }






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