import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "./ShirtProvider"
import { ShirtDetail } from "./ShirtDetail"
import "./Shirts.css"
import { useHistory } from "react-router-dom"
import { act } from "react-dom/cjs/react-dom-test-utils.production.min"

export const ShirtList = () => {
    const { shirts, getShirts } = useContext(ShirtContext)

    const [activeShirts, setActiveShirts] = useState([])

    const history = useHistory()

    useEffect(() => {
        getShirts()
    }, [])

    useEffect(() =>{
        const theseActiveShirts = shirts.filter(shirt => shirt.active === true)
        setActiveShirts(theseActiveShirts)
    }, [shirts])

    return (
        <>
            <button onClick={
                () => history.push("./create")
            }>Add Shirt
            </button>

            <h2>Shirts</h2>
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
