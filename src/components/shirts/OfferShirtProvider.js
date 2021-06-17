import React, { useState, createContext } from "react"

export const OfferShirtContext = createContext()

export const OfferShirtProvider = (props) => {
    const [offerShirts, setOfferShirts] = useState([])

    const getOfferShirts = () => {
        return fetch("http://localhost:7777/shirts?_expand=user&_expand=size")
        .then(res=> res.json())
        .then(setOfferShirts)
    }

    const getOfferShirtById = (id) => {
        return fetch(`http://localhost:7777/shirts/${id}?_expand=user&_expand=size`)
        .then(res=> res.json())
    }


    return (
        <OfferShirtContext.Provider value={{
        offerShirts, getOfferShirts, getOfferShirtById
    }}>
    {props.children}
    </OfferShirtContext.Provider>
    )
}