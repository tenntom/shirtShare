import React, { useState, createContext } from "react"

export const TradeContext = createContext()

export const TradeProvider = (props) => {
    const [trades, setTrades] = useState([])

    const getTrades = () => {
        return fetch("http://localhost:7777/trades?_expand=shirt")
            .then(res => res.json())
            .then(setTrades)
    }

    const addTrade = tradeObj => {
        return fetch("http://localhost:7777/trades", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tradeObj)
        })
            .then(response => response.json)
    }

    const getTradeById = (msgId) => {
        return fetch(`http://localhost:7777/trades/${msgId}?_expand=shirt`)
            .then(res => res.json())
    }

    const removeTrade = (tradeId) => {
        return fetch(`http://localhost:7777/trades/${tradeId}`, {
            method: "DELETE",
        })
            .then(getTrades)
    }

    const updateTrade = trade => {
        return fetch(`http://localhost:7777/trades/${trade.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trade)
        })
            .then(getTrades)
    }


    return (
        <TradeContext.Provider value={{
            trades, getTrades, addTrade, getTradeById, removeTrade, setTrades, updateTrade
        }}>
            {props.children}
        </TradeContext.Provider>
    )
}