import React, { useContext, useEffect } from "react"
import { ShirtContext } from "./ShirtProvider"
import { ShirtDetail } from "./ShirtDetail"
import "./Shirts.css"
// import { useHistory } from "react-router-dom"

export const ShirtList = () => {
    const { shirts, getShirts } = useContext(ShirtContext)

    useEffect(() => {
        getShirts()
    }, [])

    return (
        <>
            <h2>Shirts</h2>
            <div className="shirts">
                {
                    shirts.map((shirt) => {
                        return (
                            <ShirtDetail Shirt={Shirt} key={Shirt.id}/>
                            // <div key={Shirt.id} className="Shirt">
                            //     <h4>Shirt: {Shirt.title}</h4>
                            // <link>maybe a link with the photo</link>
                            // </div>
                        )
                    })
                }
            </div>
        </>
    )
}
