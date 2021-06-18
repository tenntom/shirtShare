import React from "react"
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import "./ShirtShare.css"
import {NavBar} from "./components/nav/NavBar"

const Opening = () => (
    <header className="mainPageHeader">
        <h2>Secondhand ShirtShare</h2>
        {/* <small>Reinvigorate your Wardrobe.</small>
        <small>Refresh your closet.</small>
        <small>Retain your Cash.</small> */}
        {/* <small className="line line1">Coolify your Closet.</small>
        <small className="line line2">Keep your Coin.</small> */}
        <small className="line line2">Thrillify your Threads.</small>
        <small className="line line1">Clear your Closet.</small>
        <small className="line line2">Keep your Coin.</small>
        {/* <small className="line line3">Outhip the Hipsters.</small> */}
    </header>
)

const ShirtShare = () => (
    <>
        <Route
        render={() => {
            if (localStorage.getItem("shirtshare_user")) {
                return (
                    <>
                    <Opening />
                    <NavBar />
                    <ApplicationViews />
                    </>
                );
            } else {
                return <Redirect to="./login" />
            }
        }
        }
        />

        <Route path="/login">
            <Opening />
            <Login />
        </Route>

        <Route path="/register">
            <Opening />
            <Register />
        </Route>

    </>
)

export default ShirtShare
