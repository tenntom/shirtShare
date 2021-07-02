import React, { useState, createContext } from "react"


export const UserContext = createContext()

// setting up UserProvider for user data.

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        shirts: []
    })

    const getUsers = () => {
        return fetch("http://localhost:7777/users?_embed=shirts")
        .then(res => res.json())
        .then(setUsers)
    }

    const addUser = userObj => {
        return fetch("http://localhost:7777/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
        .then(getUsers)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:7777/users/${id}?_embed=shirts`)
        .then(res=> res.json())
        .then(userObj => setUser(userObj))
    }


    return (
        <UserContext.Provider value={{
            users, getUsers, addUser, getUserById, user, setUser, getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}