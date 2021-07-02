import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "./ShirtProvider"
import { ShirtDetail } from "./ShirtDetail"
import "./Shirts.css"
import { useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { ShirtSearch } from "./ShirtSearch"

export const ShirtList = () => {
    const { shirts, getShirts, searchTerms, setSearchTerms, shirtSizes, getSizes } = useContext(ShirtContext)
    const { users, getUsers, getUserById } = useContext(UserContext)

    const [activeShirts, setActiveShirts] = useState([])

    const [displayShirts, setDisplayShirts] = useState([])

    const [selectedUserShirts, setSelectedUserShirts] = useState([])

    const [selectedSizeShirts, setSelectedSizeShirts] = useState([])

    const [sortByTimeShirts, setSortByTimeShirts] = useState([])

    const [mostRecentShirts, setMostRecentShirts] = useState([])

    const [filteredShirts, setFiltered] = useState([])

    const history = useHistory()

    useEffect(() => {
        getShirts()
        getUsers()
        getSizes()
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


    useEffect(() => {
        setDisplayShirts(selectedUserShirts)
    }, [selectedUserShirts]
    )

    useEffect(() => {
        setDisplayShirts(selectedSizeShirts)
    }, [selectedSizeShirts]
    )

    useEffect(() => {
        setDisplayShirts(sortByTimeShirts)
    }, [sortByTimeShirts]
    )

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
                    <option className="user_option" value={0}>All Users</option>
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

    const SizeDropDown = () => {

        return (
            <div className="filter-by-size filter">
                <select className="size_select" onChange={(changeEvent) => {
                    let selectedSizeId = parseInt(changeEvent.target.value)
                    let theseShirts = (selectedSizeId === 0)
                        ? activeShirts
                        : activeShirts.filter(shirt => shirt.sizeId === selectedSizeId);
                    setSelectedSizeShirts(theseShirts)
                    setDisplayShirts(theseShirts)
                }}>
                    <option className="user_option" value={0}>All Sizes</option>
                    {
                        shirtSizes.map(size => {
                            return (
                                <option className="user_option" value={size.id}>{size.shirtSize}</option>
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
                    setSortByTimeShirts(theseShirts)
                    console.log(changeEvent.target.value)
                    console.log(sortByTimeShirts)
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
            <div className="shirtList">
                <div className="sidebar">
                    <button className="create-shirt-btn aside-btn" onClick={
                        () => history.push("./create")
                    }>Add Shirt
                    </button>

                    <button className="propose-trade-btn aside-btn" onClick={
                        () => history.push("/trades/create")
                    }>
                        Propose Trade
                    </button>

                    <div className="user-dropdown dropdown">
                        <h5>Search by User</h5>
                        {UserDropDown()}
                    </div>

                    <div className="user-dropdown dropdown">
                        <h5>Search by Size</h5>
                        {SizeDropDown()}
                    </div>

                    <div className="time-dropdown dropdown">
                        <h5>Sort by Most Recent</h5>
                        {sortByPostDate()}
                    </div>

                    <div className="keyword-search">
                        <h5>Keyword Search</h5>
                        <ShirtSearch />
                    </div>

                    <div>
                        <button className="reset-btn aside-btn">
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
            </div>
        </>
    )
}
