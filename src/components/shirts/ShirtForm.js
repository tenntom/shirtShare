import React, { useContext, useEffect, useState } from "react"
import { ShirtContext } from "../shirts/ShirtProvider"
import "./Shirts.css"
import { useHistory, useParams } from 'react-router-dom';

export const ShirtForm = () => {
    const { addShirt, getSizes, shirtSizes, getShirtById, updateShirt } = useContext(ShirtContext)

    const currentUserId = parseInt(localStorage.getItem("shirtshare_user"))

    const [shirt, setShirt] = useState({
        title: "",
        userId: 0,
        sizeId: 0,
        description: "",
        imageURL: "",
        timestamp: 0,
    })

    const history = useHistory();

    const { shirtId } = useParams()

    useEffect(() => {
        getSizes()
            .then(() => {
                if (shirtId) {
                    getShirtById(shirtId)
                        .then((shirt) => {
                            setShirt(shirt)
                            setIsLoading(false)
                        })
                } else {
                    setIsLoading(false)
                }
            })
    }, [])

    const [isLoading, setIsLoading] = useState(true)

    // uploader section

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")

    const setURL = (url) => {
        shirt.imageURL = url
    }

    const uploadImage = async eventObj => {
        const files = eventObj.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'ShirtShareImages')
        setLoading(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/tenntom/image/upload",
            {
                method: "POST",
                body: data
            }
        )

        const file = await res.json()

        setImage(file.secure_url)
        setLoading(false)
    }


    //end of uploading section.

    const handleControlledInputChange = (event) => {
        const newShirt = { ...shirt }
        newShirt[event.target.id] = event.target.value
        setShirt(newShirt)
    }

    const handleClickSaveShirt = (event) => {
        event.preventDefault()

        // const sizeId = parseInt(shirt.sizeId)

        if ((shirt.title === "") || (shirt.sizeId === 0) || (shirt.description === "")) {
            window.alert("Please fill out your shirt information.")
        } else {
            setIsLoading(true)
            if (shirtId) {
                updateShirt({
                    id: shirt.id,
                    title: shirt.title,
                    userId: currentUserId,
                    // sizeId: sizeId,
                    sizeId: shirt.sizeId,
                    imageURL: shirt.imageURL,
                    description: shirt.description,
                    active: true,
                    timestamp: shirt.timestamp,
                    user: {},
                    size: {}
                })
                    .then(() => history.push("/"))
            } else {
                addShirt({
                    title: shirt.title,
                    userId: currentUserId,
                    sizeId: shirt.sizeId,
                    imageURL: shirt.imageURL,
                    description: shirt.description,
                    active: true,
                    timestamp: Date().getTime,
                    user: {},
                    size: {}
                })
                    .then(() => history.push("/"))
            }
        }
    }


    return (
        <form className="shirtForm">
            {
                shirtId ? <h2 className="shirtForm__title">Edit Shirt</h2>
                    : <h2 className="shirtForm__title">New Shirt</h2>
            }
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Shirt Title:</label>
                    <input type="text" id="title" className="form-control" placeholder="Shirt Title" value={shirt.title} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Size:</label>
                    <select name="sizeId" id="sizeId" className="form-control" value={shirt.sizeId} onChange={handleControlledInputChange}>
                        <option value="0">Select a Size:</option>
                        {
                            shirtSizes.map((s) => {
                                return (
                                    <option key={s.id} value={s.id}>
                                        {s.shirtSize}
                                    </option>
                                )
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Shirt Description:</label>
                    <input type="text" id="description" className="form-control" placeholder="Description" value={shirt.description} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <div className="form-group">
                {shirtId? 
                <div>
                    <label htmlFor="imageURL">Image URL:</label>
                    <input type="text" id="imageURL" className="form-control" placeholder="Image URL" value={shirt.imageURL} onChange={handleControlledInputChange} />
                </div>
                :
                    <div className="image-upload">
                        <h3>Upload Shirt Image</h3>
                        <input type="file" name="file" placeholder="Upload an image." onChange={uploadImage} />

                        {
                            loading ? (
                                <h4>Loading ...</h4>
                            ) : (
                                <>
                                    <img src={image} style={{ width: '300px' }} id="imageURL" value={shirt.imageURL} />
                                    {setURL(`${image}`)}
                                </>
                            )
                        }
                    </div>
                }
            </div>
            <div className="form-group save-shirt">
                <button className="btn btn-primary" onClick={handleClickSaveShirt}>
                    Save Shirt
                </button>
            </div>
        </form>
    )

}