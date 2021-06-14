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
        keywords: []
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
            <h4 className="product__type">Description: {shirt.description}</h4>
            <h4 className="shirt__size">Size: {shirt.size.size}</h4>
            <h4 className="product__price">Posted by: {shirt.user.firstName}</h4>
        </section>
    </>
    )
}