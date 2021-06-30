import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "./ShirtProvider"
import { ShirtDetail } from "./ShirtDetail"
import "./Shirts.css"
import { useHistory } from "react-router-dom"
import { act } from "react-dom/cjs/react-dom-test-utils.production.min"
import { UserContext } from "../users/UserProvider"

export const ShirtList = () => {
    const { shirts, getShirts } = useContext(ShirtContext)
    const { users, getUsers } = useContext(UserContext)

    const [activeShirts, setActiveShirts] = useState([])

    const [selectedUser, setSelectedUser] = useState({shirts:[]})

    const [selectedUserShirts, setSelectedUserShirts] = useState([])

    const history = useHistory()

    useEffect(() => {
        getShirts()
        getUsers()
    }, [])

    useEffect(() => {
        const theseActiveShirts = shirts.filter(shirt => shirt.active === true)
        setActiveShirts(theseActiveShirts)
    }, [shirts])

    // const UserDropDown = () => {
    //     return (
    //         <div className="filter-by-user">
    //             <select className="user_select" id="select_user" 
    //             onChange={event => {
    //                 thisUser = users.find(user => user.id === event.target.value)
    //                 setSelectedUser(thisUser)}}>
    //                 {
    //                     users.map(user=> {
    //                         return (
    //                             <option className="user_option" value={user.id}>{user.firstName} {user.lastName}</option>
    //                         )
    //                     })
    //                 }
    
    //             </select>
    //             {
    //                 console.log(selectedUser)
    //             }
    //         </div>
    //     )
    // }

    const HandleUserChange = (event) => {
        setSelectedUser(event.target.value)
        // console.log(event.target.value)
        // let thisUser = users.find(user => user.id === event.target.id)
        // setSelectedUser(thisUser)
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

        <button className="propose-trade-btn" onClick={
            () => console.log(selectedUser)
        }>
            Select User
        </button>
        <div>
            Filter by User:
            <div className="filter-by-user">
                <select className="user_select" id="select__user" 
                onChange={HandleUserChange}>
                    {
                        users.map(user=> {
                            return (
                                <option className="user_option" value={user}>{user.firstName} {user.lastName}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>

        <div className="shirts">
            {
                activeShirts.map((shirt) => {
                    return (
                        <ShirtDetail shirt={shirt} key={shirt.id} />
                    )
                })
            }
        </div>
    </>
)
}
