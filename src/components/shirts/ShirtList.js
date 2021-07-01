import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "./ShirtProvider"
import { ShirtDetail } from "./ShirtDetail"
import "./Shirts.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { ShirtSearch } from "./ShirtSearch"

export const ShirtList = () => {
    const { shirts, getShirts, searchTerms, setSearchTerms } = useContext(ShirtContext)
    const { users, getUsers, getUserById } = useContext(UserContext)

    const [activeShirts, setActiveShirts] = useState([])

    const [displayShirts, setDisplayShirts] = useState([])

    const [selectedUserShirts, setSelectedUserShirts] = useState([])

    const [mostRecentShirts, setMostRecentShirts] = useState([])

    const [filteredShirts, setFiltered ] = useState([])

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

    useEffect(() => {
        if (searchTerms !== "") {
          // If the search field is not blank, display matching shirts from title or description
          const subset = displayShirts.filter(shirt => shirt.title.toLowerCase().includes(searchTerms) || shirt.description.toLowerCase().includes(searchTerms))
          setFiltered(subset)
        } else {
          // If the search field is blank, display all shirts
          setFiltered(displayShirts)
        }
      }, [searchTerms, displayShirts])

    // useEffect(()=> {

    // },[displayShirts]
    // )


    const UserDropDown = () => {

        return (
            <div className="filter-by-user filter">
                <select className="user_select" onChange={(changeEvent) => {
                    let selectedUserId = parseInt(changeEvent.target.value)
                    let theseShirts = (selectedUserId === 0)
                        ? activeShirts
                        : activeShirts.filter(shirt => shirt.userId === selectedUserId);
                    setSelectedUserShirts(theseShirts)
                    setDisplayShirts(theseShirts)
                }}>
                    <option className="user_option" value={0}>Display All</option>
                    {
                        users.map(user => {
                            return (
                                <option className="user_option" value={user.id} shirts={user.shirts}>{user.firstName} {user.lastName}</option>
                            )
                        })
                    }

                </select>
            </div>
        )
    }


    const sortByPostDate = () => {
        return (
            <div className="filter-by-time filter">
                <select className="timestamp_select" onChange={(changeEvent) => {
                    let theseShirts = (changeEvent.target.value === "old")
                        ? displayShirts.sort((a, b) => b.timestamp - a.timestamp)
                        : displayShirts.sort((a, b) => a.timestamp - b.timestamp);
                    setDisplayShirts(theseShirts)
                    console.log(changeEvent.target.value)
                    console.log(displayShirts)
                }}>
                    <option value="old">Oldest Post First</option>
                    <option value="new">Most Recent First</option>
                </select>
            </div>
        )
    }


    return (
        <>
            <h2>Shirts</h2>
            <div className="sidebar">
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
            <div className="user-dropdown dropdown">
                {UserDropDown()}
            </div>

            <div className="time-dropdown dropdown">
                {sortByPostDate()}
            </div>

            <div className="keyword-search">
                <ShirtSearch />
            </div>

            <div>
                <button className="btn reset-btn">
                    Reset Filters
                </button>
            </div>
            </div>

            <div className="shirts">
                {
                    filteredShirts.map((shirt) => {
                        return (
                            <ShirtDetail shirt={shirt} key={shirt.id} />
                        )
                    })
                }
            </div>
        </>
    )
}
