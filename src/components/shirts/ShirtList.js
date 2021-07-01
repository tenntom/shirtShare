import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "./ShirtProvider"
import { ShirtDetail } from "./ShirtDetail"
import "./Shirts.css"
import { useHistory } from "react-router-dom"
import { act } from "react-dom/cjs/react-dom-test-utils.production.min"
import { UserContext } from "../users/UserProvider"
// import { UserDropDown } from "./ShirtFilters"

export const ShirtList = () => {
    const { shirts, getShirts } = useContext(ShirtContext)
    const { users, getUsers, getUserById } = useContext(UserContext)

    const [activeShirts, setActiveShirts] = useState([])

    const [displayShirts, setDisplayShirts] = useState([])

    const [selectedUser, setSelectedUser] = useState({})

    const [selectedUserShirts, setSelectedUserShirts] = useState([])

    const history = useHistory()

    useEffect(() => {
        getShirts()
        getUsers()
    }, [])

    useEffect(() => {
        const theseActiveShirts = shirts.filter(shirt => shirt.active === true)
        setActiveShirts(theseActiveShirts)
        setDisplayShirts(theseActiveShirts)
    }, [shirts])

    // useEffect(() => {
    //     const theseActiveShirts = shirts.filter(shirt => shirt.active === true)
    //     setActiveShirts(theseActiveShirts)
    // }, [shirts])



    const HandleUserChange = (event) => {
        getUserById(event.target.value)
        .then(userObj => setSelectedUser(userObj))
        
        // console.log(event.target.value)
        // let thisUser = users.find(user => user.id === event.target.id)
        // setSelectedUser(thisUser)
    }

    const UserDropDown = () => {
        
        return (
            <div className="filter-by-user">
                <select className="user_select" onChange={(changeEvent) => {
                    let selectedUserId = parseInt(changeEvent.target.value)
                    let theseShirts = (selectedUserId === 0)
                    ? activeShirts
                    : activeShirts.filter(shirt => shirt.userId === selectedUserId)
                    setSelectedUserShirts(theseShirts)
                    setDisplayShirts(theseShirts)
                }}>
                    <option className="user_option" value={0}>Display All</option>
                    {
                        users.map(user=> {
                            return (
                                <option className="user_option" value={user.id} shirts={user.shirts}>{user.firstName} {user.lastName}</option>
                            )
                        })
                    }
    
                </select>
            </div>
        )
    }


return (
    <>
        <h2>Shirts</h2>
        <button className="create-shirt-btn" onClick={
            () => history.push("./create")
        }>Add Shirt
        </button>

        <button className="propose-trade-btn" onClick={
            () => history.push("/trades/create")
        }>
            Propose Trade
        </button>

        {/* <button className="experiment_btn" onClick={
            () => console.log(selectedUser)
        }>
            Try Stuff
        </button> */}
        <div>
            {UserDropDown()}
        </div>

        <div className="shirts">
            {
                displayShirts.map((shirt) => {
                    return (
                        <ShirtDetail shirt={shirt} key={shirt.id} />
                    )
                })
            }
        </div>
    </>
)
}
