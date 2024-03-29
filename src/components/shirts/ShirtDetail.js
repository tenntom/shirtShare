import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "./ShirtProvider"
import { UserContext } from "../users/UserProvider"
import "./Shirts.css"
import { useHistory } from "react-router-dom"
import { TradeContext } from "../trades/TradeProvider"

export const ShirtDetail = (props) => {

    const { getShirtById, removeShirt, updateShirt } = useContext(ShirtContext)
    const { getUserById, user, setUser } = useContext(UserContext)
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

    const shirtId = props.shirt.id

    const history = useHistory()

    useEffect(() => {
        getShirtById(shirtId)
            .then(
                ShirtObj => (setShirt(ShirtObj))
            )
            .then(() => {
                const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))
                getUserById(currentUserId)
                .then(data => setUser(data))
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
            .then(() => getTrades())
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
                <h4 className="shirt__user">On: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(shirt.timestamp)}</h4>
                <div className="shirt__remove__div"> {
                    shirt.user.id === user.id
                        ? <div className="buttons">
                            <button className="shirt__remove shirt__btn" onClick={handleDeleteShirt}>Delete Shirt</button>
                            <button className="shirt__edit shirt__btn" onClick={()=> {
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