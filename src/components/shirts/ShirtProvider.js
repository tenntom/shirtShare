import React, { useState, createContext } from "react"

export const ShirtContext = createContext()

export const ShirtProvider = (props) => {
    const [shirts, setShirts] = useState([])
    const [shirtSizes, setSizes ] = useState([])

    const getShirts = () => {
        return fetch("http://localhost:7777/shirts?_expand=size&_expand=user")
        .then(res=> res.json())
        .then(setShirts)
    }

    const addShirt = (shirtObj) => {
        return fetch("http://localhost:7777/shirts",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shirtObj)
        })
        .then(response => response.json)
    }

    const getShirtById = (id) => {
        return fetch(`http://localhost:7777/shirts/${id}?_expand=user&_expand=size`)
        .then(res=> res.json())
    }

    const getSizes = () => {
        return fetch("http://localhost:7777/sizes")
        .then(res=> res.json())
        .then(setSizes)
    }


    return (
        <ShirtContext.Provider value={{
        shirts, getShirts, getShirtById, getSizes, shirtSizes, addShirt
    }}>
    {props.children}
    </ShirtContext.Provider>
    )
}