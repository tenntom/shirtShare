import React, {useState, createContext} from "react"

export const TradeContext = createContext()

export const TradeProvider = (props) => {
    const [trades, setTrades] = useState([])

    const getTrades = () => {
        return fetch("http://localhost:7777/trades?_expand=shirt")
        .then(res=> res.json())
        .then(setTrades)
    }

    const addTrade= tradeObj => {
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
        return fetch(`http://localhost:7777/trades/${msgId}?_expand=shirt&_expand=offer`)
        .then(res=> res.json())
    }


    return (
        <TradeContext.Provider value={{
            trades, getTrades, addTrade, getTradeById
        }}>
        {props.children}
        </TradeContext.Provider>
    )
}