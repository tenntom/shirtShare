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
        timeAccepted: 0,
        timestamp: 0,
        shirt:{}
    })

    const history = useHistory()

    useEffect(() => {
        getShirts()
    }, [])

    const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))

    const userShirts = shirts.filter(shirt => shirt.userId === currentUserId)

    const activeUserShirts = userShirts.filter(shirt => shirt.active===true)

    const otherShirts = shirts.filter(shirt => shirt.userId !== currentUserId)

    const activeOtherShirts = otherShirts.filter(shirt => shirt.active===true)

    const handleControlledInputChange = (event) => {

        const newTrade = { ...trade }

        newTrade[event.target.id] = event.target.value

        setTrade(newTrade)
    }

    const handleClickSaveEvent = (event) => {
        event.preventDefault()

        if (trade.shirtId === 0 || trade.offerShirtId === 0) {
            window.alert("Please select a shirt to trade.")
        } else {
            const newTrade = {
                shirtId: parseInt(trade.shirtId),
                offerShirtId: parseInt(trade.offerShirtId),
                message: trade.message,
                timeAccepted: 0,
                timestamp: Date.now(),
                shirt:{}
            }
           addTrade(newTrade)
           .then(() => history.push("/"))
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
                        {activeOtherShirts.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="shirt">Your Shirt to Offer:</label>
                    <select name="offerShirtId" id="offerShirtId" className="form-control" value={trade.offerShirtId} onChange={handleControlledInputChange}>
                        <option value="0">Select a Shirt:</option>
                        {activeUserShirts.map(s => (
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
            <button className="btn btn-primary" onClick={handleClickSaveEvent}>
                Save Trade
            </button>
        </form >
    )
}