import React, { useState, createContext } from "react"

export const ShirtContext = createContext()

export const ShirtProvider = (props) => {
    const [shirts, setShirts] = useState([])

    const getShirts = () => {
        return fetch("http://localhost:7777/shirts?_expand=user&_expand=size")
        .then(res=> res.json())
        .then(setShirts)
    }

    const getShirtById = (id) => {
        return fetch(`http://localhost:7777/shirts/${id}?_expand=user`)
        .then(res=> res.json())
    }

    return (
        <ShirtContext.Provider value={{
        shirts, getShirts, getShirtById
    }}>
    {props.children}
    </ShirtContext.Provider>
    )
}