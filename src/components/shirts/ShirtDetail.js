import React, { useContext, useEffect, useState } from "react"
import {ShirtContext} from "./ShirtProvider"
import "./Shirts.css"

export const ShirtDetail = (props) => {

    const {getShirtById} = useContext(ShirtContext)

    const [shirt, setShirt] = useState({
        title: "",
        userId: 0,
        sizeId: 0,
        imageURL: "",
        description: "",
        timestamp:0,
        keywords: [],
        user:{},
        size:{}
    })

    const shirtId = props.shirt.id

    useEffect(() => {
        getShirtById(shirtId)
            .then(
                ShirtObj => (setShirt(ShirtObj))
            )
    }, []
    )

    return (
    <>
        <section className="shirt">
            <h3 className="shirt__title">{shirt.title}</h3>
            <div className="shirt__image">
                <img className="shirt__image__img" src={shirt.imageURL} />
            </div>
            <h4 className="shirt__description">Description: {shirt.description}</h4>
            <h4 className="shirt__size">Size: {shirt.sizeId}</h4>
            <h4 className="shirt__user">Posted by: {shirt.userId}</h4>
            {/* This needs to show the user name and shirt Size. */}
        </section>
    </>
    )
}