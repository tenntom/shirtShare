import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const UserContext = createContext()

// This component establishes what data can be used.
export const UserProvider = (props) => {
    const [users, setUser] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:7777/users")
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
        .then(getUser)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:7777/users/${id}`)
        .then(res=> res.json())
    }
    

    return (
        <UserContext.Provider value={{
            users, getUsers, addUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}