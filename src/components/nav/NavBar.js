import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

const LogOut = () => {
    localStorage.removeItem("shirtshare_user")
}

export const NavBar = (props) => {
    return (
        <>
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/shirts">Shirts</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/trades/">All Offers</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/trades/received">Offers Received</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/trades/sent">Offers Sent</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/trades/create">New Proposal</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/login"
                        onClick={
                            (event) => {
                                LogOut()
                            }}>
                        Logout
                    </Link>
                </li>
            </ul>
        </>
    )
}