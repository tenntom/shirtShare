import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "./ShirtProvider"
import { UserContext } from "../users/UserProvider"
import "./Shirts.css"
import { useHistory } from "react-router-dom"
import { TradeContext } from "../trades/TradeProvider"

export const ShirtDetail = (props) => {

    const { getShirtById, removeShirt, updateShirt } = useContext(ShirtContext)
    const { getUserById, user } = useContext(UserContext)
    const { trades, getTrades, removeTrade } = useContext(TradeContext)

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

    const shirtId = props.shirt.id //this is an alternative to use Params

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


    const handleDeleteShirt = () => {
        getTrades()
            .then(() => {
                let shirtTrades = trades.filter((trade) =>
                    (trade.shirtId === shirt.id) || (trade.offerShirtId === shirt.id))
                shirtTrades.forEach(shirtTrade => removeTrade(shirtTrade.id))
            })
            .then(() => {
                removeShirt(shirt.id)
            })
            .then(() => getTrades)
            .then(() => history.push("/")
            )
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
                    shirt.user.id === user.id
                        ? <div className="buttons">
                            <button className="shirt__remove" onClick={handleDeleteShirt}>Delete Shirt</button>
                            <button className="shirt__edit" onClick={()=> {
                                history.push(`/edit/${shirt.id}`)
                            }}>Edit Shirt</button>
                        </div>
                        : <h6> </h6>
                }
                </div>
            </section>
        </>
    )
}