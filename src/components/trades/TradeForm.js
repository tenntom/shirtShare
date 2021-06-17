import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "../shirts/ShirtProvider"
import { TradeContext } from "./TradeProvider"
import "./Trades.css"
import { useHistory } from "react-router-dom"

export const TradeForm = () => {
    const { addTrade } = useContext(TradeContext)
    const { shirts, getShirts } = useContext(ShirtContext)

    const [trade, setTrade] = useState({
        shirtId: 0,
        offerShirtId: 0,
        message: "",
        accepted: false,
        timestamp: 0
    })

    const history = useHistory()

    useEffect(() => {
        getShirts()
    }, [])

    // useEffect(() => ) need a way to update image as we go. 

    const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))

    const userShirts = shirts.filter(shirt => shirt.userId === currentUserId)

    const otherShirts = shirts.filter(shirt => shirt.userId !== currentUserId)

    const handleControlledInputChange = (event) => {

        const newTrade = { ...trade }

        newTrade[event.target.id] = event.target.value

        setTrade(newTrade)
    }

    const handleClickSaveEvent = (event) => {
        event.preventDefault()

        // const recShirtId = parseInt(trade.ShirtId)
        // //this needs to the shirt id of whatever was selected. Or maybe a dropdown of all of them?

        // const thisOfferShirtId = parseInt(trade.offerShirtId)
        // //this needs to be a dropdown with an array of shirts filtered by the local user.


        if (trade.shirtId === 0) {
            window.alert("Please select a shirt to trade.")
        } else {
            const newTrade = {
                shirtId: trade.shirtId,
                // or shirtId: trade.shirtId
                // of offerShirtId: trade.offerShirtId
                offerShirtId: trade.offerShirtId,
                message: trade.message,
                accepted: false,
                timestamp: Date.now()

            }
            addTrade(newTrade)
            .then(() => history.push("/trades"))
        }
    }

    return (
        <form className="tradeForm">
            <h2 className="tradeForm__title">New Trade for:</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="recShirt">The shirt you want:</label>
                    <select name="shirtId" id="shirtId" className="form-control" value={trade.shirtId} onChange={handleControlledInputChange}>
                        <option value="0">Select a Shirt:</option>
                        {otherShirts.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.title}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <div className="recShirt">
                <img src={trade.shirt.imageURL} className="recShirt__image" />
            </div> */}
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="shirt">Your Shirt to Offer:</label>
                    <select name="offerShirtId" id="offerShirtId" className="form-control" value={trade.offerShirtId} onChange={handleControlledInputChange}>
                        <option value="0">Select a Shirt:</option>
                        {userShirts.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="message">Your message:</label>
                    <input type="text" id="message" className="form-control" placeholder="Type a personal message" value={trade.message} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="accepted">Accepted:</label>
                    <input id="manager"
                        onChange={
                            (changeEvent) => {
                                const copyOfTradeState = { ...trade }
                                copyOfTradeState.accepted = !copyOfTradeState.accepted
                                setTrade(copyOfTradeState)
                            }
                        }
                        type="checkbox" checked={trade.accepted} />
                    {/* need to figure out how to make this show only for the receiver */}
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSaveEvent}>
                Save Trade
            </button>
        </form >
    )
}