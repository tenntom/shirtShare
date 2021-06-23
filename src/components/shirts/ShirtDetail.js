import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "./ShirtProvider"
import { UserContext } from "../users/UserProvider"
import "./Shirts.css"
import { useHistory } from "react-router-dom"
import { TradeContext } from "../trades/TradeProvider"

export const ShirtDetail = (props) => {

    const { getShirtById, removeShirt, updateShirt } = useContext(ShirtContext)
    const { getUserById, user } = useContext(UserContext)
    const { trades, getTrades, removeTrade } = useContext(TradeContext)

    const [shirt, setShirt] = useState({
        title: "",
        userId: 0,
        sizeId: 0,
        imageURL: "",
        description: "",
        timestamp: 0,
        keywords: [],
        user: {},
        size: {}
    })

    const shirtId = props.shirt.id //need to better understand the difference between this and setParams.

    const history = useHistory()

    useEffect(() => {
        getShirtById(shirtId)
            .then(
                ShirtObj => (setShirt(ShirtObj))
            )
            .then(() => {
                const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
                getUserById(currentUserId)
            }
            )
    }, []
    )

    // useEffect(() => {
    //     getTrades()
    // }, [shirt])

    // const handleRemove = () => {
    //     removeShirt(shirt.id)
    //         .then(() => {
    //             history.push("/")
    //         })
    // }

    // const deleteTradeByShirt = (shirt) => {
    //     trades.map((trade) => {
    //         if (trade.shirtId === shirt.id || trade.offerShirtId === shirt.id) {
    //             removeTrade(trade.id)
    //         }
    //     })
    // }

    // const deleteTradeByShirt = (shirt) => {
    //     for (trade of trades) {
    //         if (trade.offerShirtId === shirt.id) {
    //             removeTrade(trade.id)
    //         }
    //     }
    // }

    // const deleteTradeByOfferShirt = (shirt) => {
    //     trades.map((trade) => {
    //         if (trade.offerShirtId === shirt.id) {
    //             removeTrade(trade.id)
    //         }
    //     })
    // }

    // I think we can actually delete this shirt because it should not be part of any active trades anymore. 



    // const handleArchiveShirt = () => {
    //     getTrades()
    //     .then(() => {
    //     const copyOfShirtState = { ...shirt }
    //     copyOfShirtState.active = false
    //     deleteTradeByShirt(copyOfShirtState)
    //     deleteTradeByOfferShirt(copyOfShirtState)
    //     updateShirt(copyOfShirtState)
    //     // .then(()=> {deleteTradeByShirtId()})
    //     // .then(() => {deleteTradeByOfferShirtId())
    //     history.push("/")
    //     })
    // }

    // const handleDeleteShirt = () => {
    //     getTrades()
    //         .then(() => { deleteTradeByShirt(shirt) })
    //         .then(() => { removeShirt(shirt.id)
    //         })
    //         .then(() => history.push("/")
    //         )
    // }

    // const handleDeleteShirt = () => {
    //     getTrades()
    //         .then(() => { 
    //             console.log(shirt)
    //             const shirtTrades = trades.filter((trade) => trade.shirtId === shirt.id)
    //             shirtTrades.forEach(shirtTrade => removeTrade(shirtTrade.id))  
    //             })
    //         .then(() => { 
    //             const offerShirtTrades = trades.filter((trade) => trade.offerShirtId === shirt.id)
    //             offerShirtTrades.forEach(offerShirtTrade => removeTrade(offerShirtTrade.id))  
    //             })
    //         .then(() => { 
    //             removeShirt(shirt.id)
    //         })
    //         .then(()=> getTrades)
    //         .then(() => history.push("/")
    //         )
    // }

    // const tradesByShirts = (tradeObj) => {
    //     if((tradeObj.shirtId === shirt.id) || (tradeObj)
    // }

    //experimenting
    const handleDeleteShirt = () => {
        getTrades()
            .then(() => { 
                let shirtTrades = trades.filter((trade) =>
               ( trade.shirtId === shirt.id) || (trade.offerShirtId === shirt.id))
                shirtTrades.forEach(shirtTrade => removeTrade(shirtTrade.id))  
                })
            .then(() => { 
                removeShirt(shirt.id)
            })
            .then(()=> getTrades)
            .then(() => history.push("/")
            )
    }

    // const handleDeleteShirt = (shirt) => {
    //     deleteTradeByShirt(shirt.id)
    //     .then(() => {
    //         deleteTradeByOfferShirt(shirt.id)
    //     })
    //     .then(() => {
    //             removeShirt(shirt.id)
    //     })
    //     .then(() => {
    //             history.push("/")
    //     })
    // }

    return (
        <>
            <section className="shirt">
                <h3 className="shirt__title">{shirt.title}</h3>
                <div className="shirt__image">
                    <img className="shirt__image__img" src={shirt.imageURL} />
                </div>
                <h4 className="shirt__description">Description: {shirt.description}</h4>
                <h4 className="shirt__size">Size: {shirt.size.shirtSize}</h4>
                <h4 className="shirt__user">Posted by: {shirt.user.firstName}</h4>
                <div className="shirt__remove__div"> {
                    shirt.user.id === user.id
                        ? <button className="shirt__remove" onClick={handleDeleteShirt}>Remove Shirt</button>
                        : <h6> </h6>
                }
                </div>
            </section>
        </>
    )
}