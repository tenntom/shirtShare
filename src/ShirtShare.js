import React from "react"
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import "./ShirtShare.css"
import {NavBar} from "./components/nav/NavBar"


// Opening to show up as a header on all pages.
const Opening = () => (
    <header className="mainPageHeader">
        <h2>2nd Hand T-Party</h2>
        <small className="line line2">Refresh your Wardrobe.</small>
        <small className="line line1">Clean your Closet.</small>
        <small className="line line2">Keep your Coin.</small>
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
