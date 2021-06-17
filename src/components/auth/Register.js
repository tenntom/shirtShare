import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const address = useRef()
    const city = useRef()
    const state = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:7777/users?email=${email.current.value}`)
        .then(res=>res.json())
        .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
        .then((userExists) => {
            if (!userExists) {
                fetch("http://localhost:7777/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.current.value,
                        firstName: firstName.current.value,
                        lastName: lastName.current.value,
                        address: address.current.value
                    })
                })
                .then (res=> res.json())
                .then (createdUser => {
                    if (createdUser.hasOwnProperty("id")) {
                        localStorage.setItem("shirtshare_user", createdUser.id)
                        history.push("/")
                    }
                })
            }
            else {
                conflictDialog.current.showModal()
            }
        })
    }

    return (
        <main style={{ textAlign: "center"}}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists.</div>
                <button className="button--close" onClick={e=> conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className = "h3 mb-3 font-weight-normal">Please Register for Secondhand ShirtShare!</h1>
                <fieldset>
                    <label htmlFor="firstName">First Name</label>
                    <input ref={firstName} type = "text" name="firstName" className="form-control" placeholder="First Name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName">Last Name</label>
                    <input ref={lastName} type = "text" name="lastName" className="form-control" placeholder="Last Name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="address">Address</label>
                    <input ref={address} type = "text" name="address" className="form-control" placeholder="Address" required autoFocus />
                    <label htmlFor="city">City</label>
                    <input ref={city} type = "text" name="city" className="form-control" placeholder="City" required autoFocus />

                    <label htmlFor="address">State</label>
                    <input ref={state} type = "text" maxLength="2" name="state" className="form-control" placeholder="State" required autoFocus />
                    <label htmlFor="zip">Zip</label>
                    <input ref={address} type = "number" maxLength="5" name="zip" className="form-control" placeholder="Zip" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input ref={email} type = "text" name="email" className="form-control" placeholder="Email address" required autoFocus />
                </fieldset>
                <fieldset>
                    <button type="submit"> Sign In </button>
                </fieldset>
            </form>
        </main>
    )
}