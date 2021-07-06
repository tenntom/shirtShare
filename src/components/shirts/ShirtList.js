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

    const [filteredShirts, setFiltered] = useState([])

    const history = useHistory()

    useEffect(() => {
        getShirts()
        getUsers()
        getSizes()
    }, [])

    useEffect(() => {
        const theseActiveShirts = shirts.filter(shirt => shirt.active === true)
        const theseRecentShirts = theseActiveShirts.sort((a, b) => b.timestamp - a.timestamp)
        setActiveShirts(theseRecentShirts)
        setDisplayShirts(theseRecentShirts)
    }, [shirts])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching shirts from title, description, first name, or last name.
            const subset = displayShirts.filter(shirt => shirt.title.toLowerCase().includes(searchTerms) || shirt.description.toLowerCase().includes(searchTerms) || shirt.user.firstName.toLowerCase().includes(searchTerms) || shirt.user.lastName.toLowerCase().includes(searchTerms))
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
                <select className="user_select" id="selected_user" onChange={(changeEvent) => {
                    let selectedUserId = parseInt(changeEvent.target.value)
                    let selectedSize = document.getElementById("selected_size")
                    let selectedSizeId = parseInt(selectedSize.value)
                    let copyOfActiveShirts = [...activeShirts]
                    let theseShirts = (selectedUserId === 0) && (selectedSizeId === 0)
                        ? copyOfActiveShirts
                        : (selectedUserId > 0) && (selectedSizeId === 0)
                            ? copyOfActiveShirts.filter(shirt => shirt.userId === selectedUserId)
                            : selectedUserId === 0
                                ? copyOfActiveShirts.filter(shirt => shirt.sizeId === selectedSizeId)
                                : copyOfActiveShirts.filter((shirt) => (shirt.userId === selectedUserId) && (shirt.sizeId === selectedSizeId))
                    setSelectedUserShirts(theseShirts)
                }}>
                    <option className="user_option" value={0} selected>All Users</option>
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
                <select className="size_select" id="selected_size" onChange={(changeEvent) => {
                    let selectedUser = document.getElementById("selected_user")
                    let selectedUserId = parseInt(selectedUser.value)
                    let selectedSizeId = parseInt(changeEvent.target.value)
                    let copyOfActiveShirts = [...activeShirts]
                    let theseShirts = (selectedSizeId === 0) && (selectedUserId === 0)
                        ? copyOfActiveShirts
                        : (selectedSizeId > 0) && (selectedUserId === 0)
                            ? copyOfActiveShirts.filter(shirt => shirt.sizeId === selectedSizeId)
                            : selectedSizeId === 0
                                ? copyOfActiveShirts.filter(shirt => shirt.userId === selectedUserId)
                                : copyOfActiveShirts.filter((shirt) => (shirt.sizeId === selectedSizeId) && (shirt.userId === selectedUserId));
                    setSelectedSizeShirts(theseShirts)
                }}>
                    <option className="size_option" value={0} >All Sizes</option>
                    {
                        shirtSizes.map(size => {
                            return (
                                <option className="size_option" value={size.id}>{size.shirtSize}</option>
                            )
                        })
                    }

                </select>
            </div >
        )
    }

    const sortByPostDate = () => {
        return (
            <div className="filter-by-time filter">
                <select className="timestamp_select" onChange={(changeEvent) => {
                    let copyOfDisplayShirts = [...displayShirts]
                    let theseShirts = (changeEvent.target.value === "new")
                        ? copyOfDisplayShirts.sort((a, b) => b.timestamp - a.timestamp)
                        : copyOfDisplayShirts.sort((a, b) => a.timestamp - b.timestamp);
                    setSortByTimeShirts(theseShirts)
                }}>
                    <option value="new">Recent First</option>
                    <option value="old">Oldest First</option>
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
                        <h5>Filter by User</h5>
                        {UserDropDown()}
                    </div>

                    <div className="user-dropdown dropdown">
                        <h5>Filter by Size</h5>
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
