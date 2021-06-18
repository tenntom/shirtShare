import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "./ShirtProvider"
import { UserContext } from "../users/UserProvider"
import "./Shirts.css"
import { useHistory } from "react-router-dom"

export const ShirtDetail = (props) => {

    const { getShirtById, removeShirt } = useContext(ShirtContext)
    const { getUserById, user } = useContext(UserContext)

    const [shirt, setShirt] = useState({
        title: "",
        userId: 0,
        sizeId: 0,
        imageURL: "",
        description: "",
        timestamp: 0,
        keywords: [],
        user: {},
        size: {}
    })





    const shirtId = props.shirt.id //what is the difference between this and setParams? Related to search?

    const history = useHistory()

    useEffect(() => {
        getShirtById(shirtId)
            .then(
                ShirtObj => (setShirt(ShirtObj))
            )
            .then(() => {
                const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
                getUserById(currentUserId)
            }
            )
    }, []
    )

    const handleRemove = () => {
        removeShirt(shirt.id)
            .then(() => {
                history.push("/shirts")
            })
    }

    return (
        <>
            <section className="shirt">
                <h3 className="shirt__title">{shirt.title}</h3>
                <div className="shirt__image">
                    <img className="shirt__image__img" src={shirt.imageURL} />
                </div>
                <h4 className="shirt__description">Description: {shirt.description}</h4>
                <h4 className="shirt__size">Size: {shirt.size.shirtSize}</h4>
                <h4 className="shirt__user">Posted by: {shirt.user.firstName}</h4>
                <div className="shirt__remove__div"> {
                    shirt.user.id===user.id
                    ?<button className="shirt__remove" onClick={handleRemove}>Remove Shirt</button>
                    :<h6> </h6>
                }
                </div>
            </section>
        </>
    )
}