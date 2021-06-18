import React, {useRef} from "react"
import {Link} from "react-router-dom"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Login = props => {
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:7777/users?email=${email.current.value}`)
        .then(res=>res.json())
        .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
        .then(exists => {
            if (exists) {
                localStorage.setItem("shirtshare_user", exists.id)
                history.push("/")
            } else {
                existDialog.current.showModal()
            }
        })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User Does Not Exist, yo.</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Welcome to Secondhand ShirtShare!</h1>
                    <h2>Please Sign In</h2>
                    <fieldset>
                        <label htmlFor="inputEmail">Email Address</label>
                        <input ref={email} type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email Address"
                        required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign In
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a ShirtSharer yet?</Link>
            </section>

        </main>
    )
}