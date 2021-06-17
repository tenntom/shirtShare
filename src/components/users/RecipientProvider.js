import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RecipientContext = createContext()

// This component establishes what data can be used.
export const RecipientProvider = (props) => {
    const [Recipients, setRecipients] = useState([])

    const getRecipients = () => {
        return fetch("http://localhost:7777/Users")
        .then(res => res.json())
        .then(setRecipients)
    }

    const addRecipient = RecipientObj => {
        return fetch("http://localhost:7777/Recipients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(RecipientObj)
        })
        .then(getRecipients)
    }

    const getRecipientById = (id) => {
        return fetch(`http://localhost:7777/Recipients/${id}`)
        .then(res=> res.json())
    }


    return (
        <RecipientContext.Provider value={{
            Recipients, getRecipients, addRecipient
        }}>
            {props.children}
        </RecipientContext.Provider>
    )
}